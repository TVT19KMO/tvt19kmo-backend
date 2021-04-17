const { Router } = require("express");
const bodyParser = require("body-parser");
const { stripe, WEBHOOK_KEY } = require("../app/utils/stripe");

const router = Router();

/**
 * [POST] /create-checkout-session
 * Handles product purchase by creating checkout session with Stripe.
 */
router.post("/create-checkout-session", async (req, res) => {
  const { items, route, user } = req.body;

  const { id } = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: route,
    cancel_url: route,
    metadata: {
      user,
    }
  });

  res.json({ id });
});

/**
 * [POST] /webhook
 * Handles Stripe webhook actions.
 */
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async ({ headers, body }, res) => {
    try {
      // Used to check if the event is from stripe.
      const event = stripe.webhooks.constructEvent(
        body,
        headers["stripe-signature"],
        WEBHOOK_KEY
      );

      // Transfer coins to parent's account.
      if (event.type === "checkout.session.completed") {
        const { object: session } = event.data;
        session.amount_total;
        switch (session.amount_total) {
          case 199:
          case 299:
          case 499:
        }
      }
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    return ses.send();
  }
);

module.exports = router;
