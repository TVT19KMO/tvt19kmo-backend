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
 *  Creates a new child.
 *
 * @param {Object} childData Data required to create a child.
 */
const createChild = async (childData) => {
  const child = new Child({
    ...childData,
    code: Math.floor(10000000 + Math.random() * 90000000),
  });
  return await child.save();
};

/**
 * Returns child with the given linking code.
 *
 * @param {Number} code The code used for linking parent -> child.
 */
const getChildByCode = async (code) => await Child.findOne({ code });

const getChildById = async (id) => await Child.findById(id);

module.exports = {
  getChildByCode,
  getChildById,
  getChildrenForParent,
  createChild,
};
