const express = require("express");
const Task = require("../models/task");
const cAuth = require('../utils/auth')
const router = express.Router();

router.get("/", (req, res) => {
  //res.json(taskList)
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) => res.status(400).json({ message: error }));
});

router.post("/", cAuth.checkAuth,(req, res) => {
  const task = new Task({
    taskName: req.body.taskName,
    creatingDate: req.body.creatingDate,
    dueDate: req.body.dueDate,
    once: req.body.once,
    note: req.body.note,
    room: req.body.room,
    points: req.body.points,
    reward: req.body.reward,
    assignedTo: req.body.assignedTo,
  });

  task
    .save()
    .then(() => res.status(200).json({ message: "Task created" }))
    .catch((error) => res.status(400).json({ message: error }));
});

router.put("/:id", cAuth.checkAuth, (req, res) => {
  Task.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((task) => {
      (taskName = req.body.taskName),
        (creatingDate = req.body.creatingDate),
        (dueDate = req.body.dueDate),
        (once = req.body.once),
        (note = req.body.note),
        (room = req.body.room),
        (points = req.body.points),
        (reward = req.body.reward),
        (assignedTo = req.body.assignedTo);

      task
        .save()
        .then(() => res.status(200).json({ message: "Task updated" }))
        .catch((error) => res.status(400).json({ message: error }));
    })
    .catch(() => res.status(500).json({ message: "Not found" }));
});

router.delete("/:id", cAuth.checkAuth, (req, res) => {
  Task.findByIdAndDelete(req.params.id, (error, result) => {
    if (result) {
      return res.status(200).json({ message: "Task deleted" });
    } else {
      return res.status(400).json({ message: "Not found" });
    }
  });
});

module.exports = router;
