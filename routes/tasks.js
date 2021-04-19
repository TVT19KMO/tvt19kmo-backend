// @ts-check

const router = require("express").Router();
const Task = require("../models/task");
const { mw } = require("../app/utils");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../queries/tasks");

// Router middleware.
router.use(mw.authenticate);
router.use("/:id", [mw.authorize(Task, "creator")]);

/**
 * [GET] /
 * Fetches all tasks.
 */
router.get("/", getTasks);

/**
 * [POST] /
 * Creates a new task.
 */
router.post("/", createTask);

/**
 * [PUT] /:id
 * Update a task with the given id.
 */
router.put("/:id", updateTask);

/**
 * [DELETE] /:id
 * Deletes a task with the given id.
 */
router.delete("/:id", deleteTask);

module.exports = router;
