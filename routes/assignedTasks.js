const router = require("express").Router();
const { mw } = require("../app/utils");
const { AssignedTask } = require("../models");
const {
  getTasks,
  assignTask,
  completeTask,
  deleteTask,
} = require("../queries/assignedTasks");

// Apply router middleware.
router.use(mw.authenticate);
router.use("/:id", [mw.authorize(AssignedTask, "assigner")]);

/**
 * [GET] /
 * Allows parent/child to fetch all assigned tasks.
 *
 * @request
 *
 * @response
 * @field {[AssignedTask]} tasks - An array of every assigned task where
 * the parent is the assigner or the child is the assignee.
 * @status 200
 *
 * @errors 400, 401, 500
 */
router.get("/", getTasks);

/**
 * [POST] /
 * Allows parent to create tasks for multiple children.
 *
 * @request
 * @field {[ObjectId]} children - An array of children identifiers the task is assigned to.
 * @field {ObjectId} task - The identidier of the task assigned to children.
 *
 * @response
 * @field {[AssignedTask]} tasks - An array of tasks assigned for each children.
 * @status 201
 *
 * @errors 400, 401, 500
 */
router.post("/", assignTask);

/**
 * [POST] /:id/complete
 * Allows parent to mark assigned tasks as completed.
 *
 * @response
 * @field {AssignedTask} task - The completed task.
 * @status 200
 *
 * @errors 401, 403, 404, 500
 */
router.post("/:id/complete", completeTask);

/**
 * [DELETE] /:id
 * Deletes an assigned task.
 *
 * @request
 * @param {ObjectId} id Id of the task to delete.
 *
 * @response
 * @status 203
 *
 * @errors 404
 */
router.delete("/:id", deleteTask);

module.exports = router;
