/**
 * This module contains some authentication/authorization
 * related helper functions and middleware.
 *
 * @module utils/auth
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { badRequestError } = require("./errors");

/**
 * Returns a JSON webtoken from the given request.
 *
 * @param {import('express').Request} req The request.
 * @returns {string} JSON web token.
 */
const getToken = (req) => {
  // Get the authorization header field.
  const authHeader = req.get("Authorization");

  const token =
    // Make sure auth header exists.
    authHeader &&
    // Check for bearer auth type.
    authHeader.toLowerCase().startsWith("bearer") &&
    // Get the token (string after bearer)
    authHeader.substring(7);

  return token;
};

/**
 * Middleware to check if there is a bearer token in request.
 *
 * @middleware
 * @param {import('express').Request} req The request.
 * @param {import('express').Response} _ The response.
 * @param {import('express').NextFunction} next
 */
const checkToken = (req, _, next) => {
  const token = getToken(req);
  // Verify token.
  const decodedToken = jwt.verify(token, "secretkey");

  // Get data from token.
  const { username, id } = decodedToken;

  // Add parsed token data to request.
  req.username = username;
  req.userId = id;

  // Call next middleware.
  next();
};

/**
 * Middleware to hash the user password from the given request.
 *
 * @middleware
 * @param {import('express').Request} req The request.
 * @param {import('express').Response} _ The response.
 * @param {import('express').NextFunction} next
 */
const hash = async (req, _, next) => {
  const { password } = req.body;
  // Make sure password is present.
  if (!password) next(badRequestError());

  // Hash the password.
  req["passwordHash"] = await bcrypt.hash(password, 10);

  // Call next middleware.
  next();
};

module.exports = {
  authenticate: checkToken,
  getToken,
  checkToken,
  hash,
};
