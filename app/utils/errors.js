//@ts-check

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
 * @typedef {(string?) => ResponseError} ErrorCreator
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
export const forbidden = {
  message: "Access Forbidden",
  code: 403,
  strCode: "403",
};

/**
 * @type {ErrorType}
 */
export const notFound = {
  message: "Not Found",
  code: 404,
  strCode: "404",
};

/**
 * @type {ErrorType}
 */
export const conflict = {
  code: 409,
  strCode: "409",
  message: null,
};

/**
 * @type {ErrorType}
 */
export const server = {
  message: "Something went wrong :(",
  code: 500,
  strCode: "500",
};

export const errors = {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  server,
};

/**
 * Simple function to return error creator
 * for the given error type.
 * @param {ErrorType} errorType
 * @returns {ErrorCreator}
 */
const errorCreator = (errorType) => (message = errorType.message) => {
  const { strCode } = errorType;
  const error = new Error(message);
  error.name = strCode;
  return error;
};

/** @type {ErrorCreator} */
export const badRequestError = errorCreator(badRequest);

/** @type {ErrorCreator} */
export const unauthorizedError = errorCreator(unauthorized);

/** @type {ErrorCreator} */
export const forbiddenError = errorCreator(forbidden);

/** @type {ErrorCreator} */
export const notFoundError = errorCreator(notFound);
