const router = require("express").Router();

const { badRequestError } = require("../app/utils/errors");

const Item = require("../models/item");
const Child = require("../models/child");
const Purchases = require("../models/purchases");

const { mw } = require("../app/utils");

/**
 * [GET] /items
 * Allows child to fetch all available store items.
 *
 * @request
 *
 * @response {[Item]} An array of available store items.
 * @status 200
 *
 * @errors 500
 */
router.get("/items", async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

/**
 * [GET] /purchases
 * Allows child to fetch purchased store items.
 */
router.get("/purchases", mw.authenticate, async ({ childId }, res) => {
  const purchases = await Purchases.findOne({ child: childId });
  await purchases.populate("items").execPopulate();
  res.json(purchases.items);
});

/**
 * [POST] /purchase
 * Allows child to purchase a store item.
 */
router.post(
  "/purchase",
  mw.authenticate,
  async ({ childId, body: { item: itemId } }, res, next) => {
    const itemToPurchase = await Item.findById(itemId);
    const child = await Child.findById(childId);

    // Make sure child has enough money to purchase.
    if (child.balance < itemToPurchase.price)
      return next(badRequestError("Not enough money"));

    let purchases = await Purchases.findOne({ child: childId });

    // If no purchases exist, create new model.
    if (!purchases) {
      purchases = new Purchases({
        child: childId,
        items: [],
      });
    } else {
      // Check if child owns the item.
      if (purchases.items.includes(itemId))
        return next(badRequestError("Item is already owned"));
    }

    child.balance -= itemToPurchase.price;
    await child.save();

    // Add new purchase.
    purchases.items.push(itemId);
    await purchases.save();

    await purchases.populate("items").execPopulate();
    res.json(purchases.items);
  }
);

module.exports = router;
