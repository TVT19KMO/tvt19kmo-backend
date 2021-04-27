const express = require("express");
const AssignedTask = require("../models/assignedTask");

const router = express.Router();

/*
*** get all assigned tasks

We can calculte number of assigned tasks and completed tasks, coins parent has spended creating tasks, children coin balance,

most popular task room, most popular assignee and most popular task difficulty and task name
*/
router.get('/', (req, res) => {
    AssignedTask.find()
    .populate('task', { difficulty: 1, name: 1, note:1 })
    .populate('assignee', { balance: 1, name: 1 })
    .then(stats => res.status(200).json(stats))
    .catch(error => res.status(400).json({message: error}))
})

module.exports = router;