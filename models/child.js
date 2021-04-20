const mongoose = require("mongoose");

const { cleanup } = require("./utils");

const childSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      cast: false,
    },

    balance: {
      type: Number,
      required: true,
      default: 0,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: false,
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
        delete ret.parent;
      },
    },
  }
);

module.exports = mongoose.model("Child", childSchema);
