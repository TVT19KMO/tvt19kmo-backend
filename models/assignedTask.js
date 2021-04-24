const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const assignedTaskSchema = new mongoose.Schema(
  {
    // The date assigned task was finished.
    finished: {
      type: Date,
      required: false,
      default: null,
      cast: true,
    },

    // The date the task was assigned.
    assigned: {
      type: Date,
      default: Date.now,
      required: true,
      cast: true,
    },

    // The date the task was deleted.
    deleted: {
      type: Date,
      required: false,
      default: null,
      cast: true,
    },

    // The child the task is assigned to.
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
      cast: true,
    },

    // The parent who assaigned the task.
    assigner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
      cast: true,
    },

    // The task that was assigned.
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
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
        delete ret.assigner;
      },
    },
  }
);

assignedTaskSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("AssignedTask", assignedTaskSchema);
