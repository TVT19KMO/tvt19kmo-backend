const router = require("express").Router();
const TaskDifficulty = require("../models/taskDifficulty");

const taskDifficulties = [
  {
    level: 1,
    reward: 50,
  },
  {
    level: 2,
    reward: 100,
  },
  {
    level: 3,
    reward: 200,
  },
];

/**
 * [GET] /task-difficulties
 * Returns all available task difficulties.
 */
router.get("/task-difficulties", async (req, res) => {
  const taskDifficulties = await TaskDifficulty.find({});
  res.json(taskDifficulties);
});

/**
 * [POST] /task-difficulties/seed
 * Initializes database with default task difficulties.
 */
router.post("/task-difficulties/seed", async (_, res) => {
  await TaskDifficulty.deleteMany({});
  await TaskDifficulty.insertMany(taskDifficulties);
  res.status(201).end();
});

module.exports = router;
