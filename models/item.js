const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const itemSchema = new mongoose.Schema(
  {
    // Type of the item.
    type: {
      type: String,
      required: true,
      trim: true,
    },

    // Descriptive name of the item.
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Color of the item.
    color: {
      type: String,
      required: true,
      trim: true,
    },

    // The amount required to purchase the item.
    price: {
      type: Number,
      required: true,
    },
  },
  {
    strict: "throw",

    toObject: {
      transform: (_, ret) => {
        cleanup(ret);
      },
    },
    toJSON: {
      transform: (_, ret) => {
        cleanup(ret);
      },
    },
  }
);

module.exports = mongoose.model("Item", itemSchema);
