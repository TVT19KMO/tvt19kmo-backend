const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const taskRoom = new mongoose.Schema(
  {
    code: {
      type: String,
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

taskRoom.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("TaskRoom", taskRoom);
