const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const taskSchema = new mongoose.Schema(
  {
    // The name of the task.
    name: {
      type: String,
      required: true,
      cast: false,
    },

    // More specific description about the task.
    note: {
      type: String,
      cast: false,
      required: false,
    },

    // The room related to task.
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskRoom",
      required: true,
      cast: true,
    },

    // The difficulty of task.
    difficulty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskDifficulty",
      required: true,
      cast: true,
    },

    // The date task was created.
    created: {
      type: Date,
      default: Date.now,
    },

    // The date task wass deleted.
    deleted: {
      type: Date,
      cast: true,
      default: null,
    },

    // The creator of the task.
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
