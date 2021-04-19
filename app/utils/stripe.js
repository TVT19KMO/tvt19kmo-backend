const express = require("express");
const stripe = require("stripe");

/**
 * This module contains some Stripe
 * specific setup and middlewares.
 *
 * @module utils/stripe
 */

const STRIPE_KEY =
  "sk_test_51Iebt0EEKvNzBMMmZOMLFLT6BXimnFP1GZiTtUZX9eYOq8tQBEYys0ZF7LmBcnXpRN73Y6Bc0PfuRjrISExlxIT100nx1YPDIF";

const WEBHOOK_KEY = process.env.NODE_ENV !== "production" ? "whsec_EVszXtqERaVy6di0Z3yKFJf0g05plj0R" : "whsec_kHGURFKAih83zDfRi5Y0tZsz6egvxCsf";

/**
 * Creates a middleware for handling
 * Stripe webhook events.
 *
 * @middleware
 * @type {import('express').RequestHandler}
 */
const webhook = (req, res, next) => {
  if (req.originalUrl.startsWith("/api/payments/webhook")) {
    next();
  } else {
    express.json()(req, res, next);
  }
};

module.exports = {
  STRIPE_KEY,
  WEBHOOK_KEY,
  stripe: stripe(STRIPE_KEY),
  webhook,
};
