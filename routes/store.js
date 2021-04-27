const router = require("express").Router();
const Item = require("../models/item");

router.get("/items", async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

module.exports = router;
