//@ts-check

const _ = require("lodash");

/**
 * This module contains some general-purpose
 * functions to create errors. Also some
 * error-specific type declarations.
 *
 *
 * @module utils/errors
 */

/**
 * @typedef ErrorType
 * @property {String} strCode String code of the error.
 * @property {Number} code Number code of the error.
 * @property {String} message Message describing the cause of the error.
 */

/**
 * @typedef {Error} ResponseError
 */

/**
 * @type {ErrorType}
 */
const badRequest = {
  message: "Invalid request body",
  code: 400,
  strCode: "400",
};

/**
 * @type {ErrorType}
 */
const unauthorized = {
  message: "Unauthorized",
  code: 401,
  strCode: "401",
};

/**
 * @type {ErrorType}
 */
const forbidden = {
  message: "Access Forbidden",
  code: 403,
  strCode: "403",
};

/**
 * @type {ErrorType}
 */
const notFound = {
  message: "Not Found",
  code: 404,
  strCode: "404",
};

/**
 * @type {ErrorType}
 */
const conflict = {
  code: 409,
  strCode: "409",
  message: null,
};

/**
 * @type {ErrorType}
 */
const server = {
  message: "Something went wrong :(",
  code: 500,
  strCode: "500",
};

const errors = {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  server,
};

/**
 * Returns
 * @param {ErrorType} errorType
 */
const createError = (errorType, message = errorType.message) => {
  const { strCode } = errorType;
  const error = new Error(message);
  error.name = strCode;
  return error;
};

const badRequestError = _.partial(createError, badRequest);

const unauthorizedError = _.partial(createError, unauthorized);

const forbiddenError = _.partial(createError, forbidden);

const notFoundError = _.partial(createError, notFound);

module.exports = {
  server,
  conflict,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  errors,
  createError,
  badRequestError,
  unauthorizedError,
  forbiddenError,
  notFoundError,
};
