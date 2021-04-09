// @ts-check

const {
  conflict,
  server,
  badRequest,
  unauthorized,
  notFound,
  forbidden,
} = require("./errors");

/**
 * General-purpose error handler middleware.
 *
 * @type {import('express').ErrorRequestHandler}
 * @param {Object} error;
 */
const errorHandler = (error, _, res, next) => {
  // Just to know what happened...
  //logger.i(error.name);
  //logger.i(error.message);

  // Add any error specific handler code here.
  switch (error.name) {
    // Triggers when MongoDB gets invalid data.
    case "ValidationError":
      const errorFields = Object.keys(error.errors);
      const firstError = error.errors[errorFields[0]];

      switch (firstError.kind) {
        // Triggers when the user tries to create an account with
        // already existing login credentials.
        case "unique":
          res.status(conflict.code).json({
            message: "Conflict",
            detail: `${firstError.path} already in use.`,
          });
          break;
        // Missing fields.
        default:
          res
            .status(badRequest.code)
            .json({ message: badRequest.message, detail: firstError.message });
          break;
      }
      break;
    // Triggers when the user tries to upload invalid amount of files,
    // invalid fields or invalid type of files.
    case "MulterError":
    // Triggers when there is some extanous fields in request.
    case "StrictModeError":
    // Triggers for invalid data format.
    case "SyntaxError":
    // Triggers for invalid request body.
    case badRequest.strCode:
      res
        .status(badRequest.code)
        .json({ message: badRequest.message, detail: error.message });
      break;
    // Triggers when JSON web token cannot be fetched.
    case "JsonWebTokenError":
    // User is not authenticated.
    case unauthorized.strCode:
      res.status(unauthorized.code).json({ message: unauthorized.message });
    // Triggers when MongoDB tries to use invalid ID or cannot convert.
    case "CastError":
      // Invalid datatype in body...
      if (!error.message.startsWith("Cast to ObjectId")) {
        res.status(badRequest.code).json({ message: badRequest.message });
        break;
      }
    // Nonexisting resource/path.
    case notFound.strCode:
      res.status(notFound.code).json({ message: notFound.message });
      break;
    // Unauthorized user.
    case forbidden.strCode:
      res.status(forbidden.code).json({ message: forbidden.message });
      break;
    // Unknown erros.
    default:
      //logger.i(error.name);
      res.status(server.code).json({ message: server.message });
  }

  next();
};

module.exports = { errorHandler };
