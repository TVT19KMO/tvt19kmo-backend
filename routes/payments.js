const { Router } = require("express");
const stripe = require("../app/utils/stripe");

const router = Router();

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount

  // Calculate the order total on the server to prevent

  // people from directly manipulating the amount on the client

  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

/**
 * [POST] /create-checkout-session
 * Handles product purchase by creating checkout session with Stripe.
 */
router.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const { id } = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: "http://localhost:3000/tvt19kmo-app/#",
  });

  res.json({ id });
});

module.exports = router;
