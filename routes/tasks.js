const express = require("express");
const { getTasks } = require("../queries/tasks");

const Task = require("../models/task");
const { mw } = require("../app/utils");

const router = express.Router();

router.get("/", getTasks);

/**
 * [POST] /tasks
 * Creates a new task.
 */
router.post("/", [mw.authenticate], async (req, res) => {
  const task = new Task({
    name: req.body.name,
    note: req.body.note,
    room: req.body.room,
    difficulty: req.body.difficulty,
    creator: req.userId,
  });

  try {
    await task.save();
    await task.populate("difficulty").populate("room").execPopulate();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

/**
 * [PUT] /tasks/:taskId
 * Update a task with the given id.
 */
router.put("/:id", [mw.authenticate], async (req, res) => {
  const { name, note, difficulty, room } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { name, note, difficulty, room },
      { new: true }
    );
    await task.populate("difficulty").populate("room").execPopulate();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

/*
 *** delete task by id
 */

router.delete("/:id", [mw.authenticate], (req, res) => {
  Task.findByIdAndDelete(req.params.id, (error, result) => {
    if (result) {
      return res.status(200).json({ message: "Task deleted" });
    } else {
      return res.status(400).json({ message: "Not found" });
    }
  });
});

module.exports = router;
