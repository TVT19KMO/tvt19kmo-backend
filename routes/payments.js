const { Router } = require("express");
const bodyParser = require("body-parser");
const Parent = require("../models/parent");
const { mw } = require("../app/utils");
const { stripe, WEBHOOK_KEY } = require("../app/utils/stripe");

const router = Router();

/**
 * [POST] /create-checkout-session
 * Handles product purchase by creating checkout session with Stripe.
 */
router.post(
  "/create-checkout-session",
  [mw.authenticate],
  async ({ body, userId }, res) => {
    const { items, route } = body;

    const { id } = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: route,
      cancel_url: route,
      metadata: {
        user: userId,
      },
    });

    res.json({ id });
  }
);

/**
 * [POST] /webhook
 * Handles Stripe webhook actions.
 */
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async ({ headers, body }, res) => {
    // Used to check if the event is from stripe.
    const event = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      WEBHOOK_KEY
    );

    // Transfer coins to parent's account.
    if (event.type === "checkout.session.completed") {
      const { object: session } = event.data;
      let coins = null;
      switch (session.amount_total) {
        case 199:
          coins = 5000;
          break;
        case 299:
          coins = 10000;
          break;
        case 499:
          coins = 20000;
      }
      if (coins) {
        const parent = await Parent.findById(session.metadata.user);
        parent.balance = parent.balance + coins;
        await parent.save();
      }
    }

    res.end();
  }
);

module.exports = router;
