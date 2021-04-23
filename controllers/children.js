const q = require("../queries/children");
const { badRequestError } = require("../app/utils/errors");

/**
 * Handles request to fetch children of parent.
 *
 * @type {import("express").RequestHandler}
 */
const getChildren = async ({ userId }, res) => {
  res.json(await q.getChildrenForParent(userId));
};

/**
 * Handles request to add a child.
 *
 * @type {import("express").RequestHandler}
 */
const addChild = async ({ body, userId }, res) => {
  res.json(await q.createChild({ parent: userId, ...body }));
};

/**
 * Handles request to link a child to parent.
 *
 * @type {import("express").RequestHandler}
 */
const linkChild = async ({ body: { code, device } }, res, next) => {
  const child = await q.getChildByCode(+code);

  // Make sure link code is not used.
  if (child.device) return next(badRequestError("This link is already in use"));

  // Update device.
  child.device = device;
  await child.save();

  res.json({ token: child.token });
};

/**
 * Handles request to remove child's device.
 *
 * @type {import("express").RequestHandler}
 */
const removeChildDevice = async ({ resource: child }, res) => {
  child.device = null;
  await child.save();
  res.json(child);
};

/**
 * Handles request to generate new linking code for a child.
 *
 * @type {import("express").RequestHandler}
 */
const generateChildCode = async ({ resource: child }, res) => {
  const newCode = 123;
  child.code = newCode;
  await child.save();
  res.json({ code: child.code });
};

module.exports = {
  addChild,
  getChildren,
  linkChild,
  removeChildDevice,
  generateChildCode,
};
