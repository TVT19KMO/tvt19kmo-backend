//import mongoose from 'mongoose';      KONSTA
//const validator = require('validator')    KONSTA
const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const assignedTaskSchema = new mongoose.Schema(
  {
    finished: {
      type: Date,
      required: false,
    },

    assigned: {
      type: Date,
      default: Date.now,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    assigner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  {
    toObject: {
      transform: (doc, ret) => {
        cleanup(ret);
      },
    },
    toJSON: {
      transform: (_, ret) => {
        cleanup(ret);
        delete ret.assigner;
      },
    },
  }
);

module.exports = mongoose.model("AssignedTask", assignedTaskSchema);
