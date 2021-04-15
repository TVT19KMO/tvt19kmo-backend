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
    },

    difficulty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskDifficulty",
      required: true,
    },

    created: {
      type: Date,
      default: Date.now,
    },

    finished: {
      type: Date,
      cast: false,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      cast: false,
    },
  },
  {
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

module.exports = mongoose.model("Task", taskSchema);
