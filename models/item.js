const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Item", itemSchema);
