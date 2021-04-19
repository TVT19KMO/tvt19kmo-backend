const router = require("express").Router();
const { mw } = require("../app/utils");
const { getTasks, assignTask } = require("../queries/assignedTasks");
const { AssignedTask } = require("../models");

// Apply router middleware.
router.use(mw.authenticate);
router.use("/:id", [mw.authorize(AssignedTask, "assigner")]);

/**
 * [GET] /
 * Allows parent to fetch all assigned tasks.
 *
 * @request
 *
 * @respones
 * @field {[AssignedTask]} tasks - An array of every assigned task where the parent is the assigner.
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
 * @status 203
 *
 * @errors 401, 403, 500
 */
router.post("/:id/complete", async ({ params }, res) => {
  const { id } = params;
  const task = await AssignedTask.findByIdAndUpdate(id, {
    finished: Date.now(),
  });
  res.status(203).json(task);
});

module.exports = router;
