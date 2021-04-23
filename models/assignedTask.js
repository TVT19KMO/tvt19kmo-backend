const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const assignedTaskSchema = new mongoose.Schema(
  {
    finished: {
      type: Date,
      required: false,
      default: null,
      cast: true,
    },

    assigned: {
      type: Date,
      default: Date.now,
      required: true,
      cast: true,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
      cast: true,
    },

    assigner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
      cast: true,
    },

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
