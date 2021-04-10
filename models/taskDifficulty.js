const mongoose = require("mongoose");

const i18n = require("i18n");

const taskDifficulty = new mongoose.Schema({
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
});

taskDifficulty.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

taskDifficulty.set("toJSON", {
  transform: (_, task) => {
    task.id = task._id.toString();
    task.name = i18n.__(`difficulties.${task.level}`);
    delete task._id;
    delete task.__v;
  },
});

module.exports = mongoose.model("TaskDifficulty", taskDifficulty);
