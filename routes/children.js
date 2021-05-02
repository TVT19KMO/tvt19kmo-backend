// @ts-check

/**
 * This module handles child related API calls.
 * Preferred route: /api/children
 *
 * @routes
 * GET  /                   - Returns children of the parent.
 * GET  /info               - Returns info of the child making the request.
 * POST /                   - Creates a new child.
 * POST /link               - Links child with a parent and allows child to access API.
 * POST /:id/remove-device  - Removes child's linked device.
 * POST /:id/generate-code  - Generates new linking code for a child.
 *
 * @module routes/children
 */

const router = require("express").Router();
const req = require("../controllers/children");
const { mw } = require("../app/utils");
const Child = require("../models/child");

/**
 * [GET] /
 * Returns children of the authenticated user (parent).
 *
 * @request
 *
 * @response {[Child]} An array of children of the parent user.
 * @status 200
 * @example
 * [
 *    {...},
 *    {...},
 *    {...}
 * ]
 *
 * @errors 401, 500
 */
router.get("/", mw.authenticate, req.getChildren);

/**
 * [GET] /
 * Returns info of the child making the request.
 *
 * @request
 *
 * @response {Child} info for the child making the request.
 * @status 200
 * @example
 * {
 *    "id": "1d2j091j02jd09a0j9da90sd",
 *    "name": "Erkki Esimerkki",
 *    "balance": 200,
 *    "code": 12345678,
 *    "device": "20371082470172410204710274172094"
 * }
 *
 * @errors 401, 500
 */
router.get("/info", mw.authenticate, req.getChildInfo);

/**
 * [POST] /
 * Creates a new child for the parent.
 *
 * @request
 * @field {String} name   - Name of the child to create.
 * @example
 * {
 *    "name": "Erkki Esimerkki"
 * }
 *
 * @response {Child} The created child resouce.
 * @status 201
 *
 * @errors 400, 401, 500
 */
router.post("/", mw.authenticate, req.addChild);

/**
 * [POST] /link
 * Links child with a parent and allows child to access API.
 *
 * @request
 * @field {Number} code   - Code used to link the child with parent.
 * @field {String} device - Unique identifier of the child's device.
 * @example
 * {
 *    "code": 12345678,
 *    "device": "20371082470172410204710274172094"
 * }
 *
 * @response
 * @field {String} token - Access token used to consume API.
 * @status 200
 * @example
 * {
 *    "token": "90ajs0d99ja00fja0fj09a0s9fj09asjf09j09asfj09"
 * }
 *
 * @errors 400, 500
 */
router.post("/link", req.linkChild);

/**
 * [PUT] /:id
 * TODO: Allow parent to update child's name.
 */

/**
 * [POST] /:id/remove-device
 * Removes child's linked device.
 *
 * @request
 * @param {String} id - Identifier of the child.
 *
 * @response
 * @status 203
 *
 * @errors 400, 401, 403, 404, 500
 */
router.post(
  "/:id/remove-device",
  [mw.authenticate, mw.authorize(Child, "parent")],
  req.removeChildDevice
);

/**
 * [POST] /:id/generate-code
 * Generates new linking code for a child.
 *
 * @request
 * @param {String} id - Identifier of the child.
 *
 * @response
 * @field {Number} code - New code generated for the child.
 * @status 200
 * @example
 * {
 *    'code': 12345678
 * }
 *
 * @errors 400, 401, 403, 404, 500
 */
router.post(
  "/:id/generate-code",
  [mw.authenticate, mw.authorize(Child, "parent")],
  req.generateChildCode
);

module.exports = router;
