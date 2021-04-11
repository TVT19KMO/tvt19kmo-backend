const Task = require("../models/task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({}).populate("difficulty").populate("room");
  res.json(tasks);
};

module.exports = {
  getTasks,
};
