const { Router } = require("express");
const { stripe } = require("../app/utils").stripe;

const router = Router();

router.get("", async (req, res) => {
  const { data: prices } = await stripe.prices.list();

  res.json(
    prices.map(({ id, nickname, unit_amount, product }) => ({
      price: +unit_amount / 100,
      amount: +nickname,
      id,
      product,
    }))
  );
});

module.exports = router;
