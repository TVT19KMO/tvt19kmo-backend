// @ts-check

const router = require("express").Router();
const { mw } = require("../app/utils");
const { getChildren } = require("../controllers/children");
const Child = require("../models/child");

// Router middleware.
router.use(mw.authenticate);
router.use("/:id", [mw.authorize(Child, "parent")]);

/**
 * [GET] /
 * Returns children of the authenticated user (parent)
 *
 * @request
 *
 * @response {[Child]} children - An array of every children of the user.
 * @status 200
 *
 * @errors 400, 401, 500
 */
router.get("/", getChildren);

module.exports = router;
