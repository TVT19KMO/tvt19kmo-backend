const { Router } = require("express");
const stripe = require("../app/utils/stripe");

const router = Router();

/**
 * [POST] /create-checkout-session
 * Handles product purchase by creating checkout session with Stripe.
 */
router.post("/create-checkout-session", async (req, res) => {
  const { items, route } = req.body;

  const { id } = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: route,
    cancel_url: route,
  });

  res.json({ id });
});

module.exports = router;
