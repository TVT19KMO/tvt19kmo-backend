// @ts-check

const Child = require("../models/child");

/**
 * Returns children from the database where
 * parent is the given id.
 *
 * @param {String} parentId The id of the parent.
 */
const getChildrenForParent = async (parentId) =>
  await Child.find({ parent: parentId });

/**
 * Returns child with the given linking code.
 *
 * @param {String} code The code used for linking parent -> child.
 */
const getChildByCode = async (code) => await Child.findOne({ code });

module.exports = {
  getChildByCode,
  getChildrenForParent,
};
