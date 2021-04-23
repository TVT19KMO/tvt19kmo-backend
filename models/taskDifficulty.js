const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const taskDifficulty = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true,
      cast: false,
    },

    reward: {
      type: Number,
      required: true,
      cast: false,
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

taskDifficulty.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("TaskDifficulty", taskDifficulty);
