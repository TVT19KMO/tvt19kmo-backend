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

module.exports = mongoose.model("TaskRoom", taskRoom);
