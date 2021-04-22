// @ts-check

const { getChildrenForParent } = require("../queries/children");

/**
 * Handles request for children.
 * @type {import("express").RequestHandler}
 */
const getChildren = async ({ userId }, res) => {
  res.json(await getChildrenForParent(userId));
};

module.exports = {
  getChildren,
};
