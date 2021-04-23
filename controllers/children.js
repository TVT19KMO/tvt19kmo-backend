const { getChildrenForParent, getChildByCode } = require("../queries/children");

/**
 * Handles request to fetch children of parent.
 * @type {import("express").RequestHandler}
 */
const getChildren = async ({ userId }, res) => {
  res.json(await getChildrenForParent(userId));
};

/**
 * Handles request to link a child to parent.
 * @type {import("express").RequestHandler}
 */
const linkChild = async ({ body: { code, device } }, res) => {
  const child = await getChildByCode(code);
  child.device = device;
  await child.save();
  res.json({ token: child.token });
};

/**
 * Handles request to remove child's device.
 * @type {import("express").RequestHandler}
 */
const removeChildDevice = async ({ resource: child }, res) => {
  child.device = null;
  await child.save();
  res.json(child);
};

/**
 * Handles request to generate new linking code for a child.
 * @type {import("express").RequestHandler}
 */
const generateChildCode = async ({ resource: child }, res) => {
  const newCode = 123;
  child.code = newCode;
  await child.save();
  res.json({ code: child.code });
};

module.exports = {
  getChildren,
  linkChild,
  removeChildDevice,
  generateChildCode,
};
