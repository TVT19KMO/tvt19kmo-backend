//import mongoose from 'mongoose';      KONSTA
//const validator = require('validator')    KONSTA
const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      cast: false,
    },

    note: {
      type: String,
      cast: false,
      requried: false,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskRoom",
      required: true,
      cast: true,
    },

    difficulty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskDifficulty",
      required: true,
      cast: true,
    },

    created: {
      type: Date,
      default: Date.now,
    },

    finished: {
      type: Date,
      cast: false,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      cast: true,
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

taskSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Task", taskSchema);
