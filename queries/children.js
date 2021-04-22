// @ts-check

const Child = require("../models/child");

/**
 * Returns children from the database where
 * parent is the given id.
 *
 * @param {String} parentId
 */
const getChildrenForParent = async (parentId) =>
  await Child.find({ parent: parentId });

module.exports = {
  getChildrenForParent,
};
