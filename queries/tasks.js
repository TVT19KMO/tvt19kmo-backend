// @ts-check

const { CREATED, NO_CONTENT } = require("./status");
const Task = require("../models/task");

const populate = async (task) =>
  await task.populate("difficulty").populate("room").execPopulate();

const getTasks = async ({ userId }, res) => {
  const tasks = await Task.find()
    .where("creator")
    .in([null, userId])
    .populate("difficulty")
    .populate("room");
  res.json(tasks);
};

const createTask = async ({ body, userId }, res) => {
  const task = new Task({
    name: body.name,
    note: body.note,
    room: body.room,
    difficulty: body.difficulty,
    creator: userId,
  });

  await task.save();
  await populate(task);

  res.status(CREATED).json(task);
};

const updateTask = async ({ resource: task, body }, res) => {
  const { name, note, difficulty, room } = body;

  task.name = name;
  task.note = note;
  task.difficulty = difficulty;
  task.room = room;

  await task.save();
  await populate(task);

  res.json(task);
};

const deleteTask = async ({ resource: task }, res) => {
  await task.delete();
  res.status(NO_CONTENT).end();
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
