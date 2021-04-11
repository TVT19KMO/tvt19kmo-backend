const router = require("express").Router();

const { getTaskDifficulties } = require("../queries/taskDifficulties");
const { getTaskRooms } = require("../queries/taskRooms");

/**
 * [GET] /task-difficulties
 * Returns all available task difficulties.
 */
router.get("/task-difficulties", getTaskDifficulties);

/**
 * [GET] /task-rooms
 * Returns all available task rooms.
 */
router.get("/task-rooms", getTaskRooms);

module.exports = router;
