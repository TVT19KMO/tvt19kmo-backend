const { badRequestError } = require("../app/utils/errors");
const {
  AssignedTask,
  Task,
  Parent,
  Child,
  TaskDifficulty,
} = require("../models");

const populate = (task) =>
  task.populate("assignee").populate("task").execPopulate();

/**
 * Handles get assigned tasks request.
 */
const getTasks = async ({ userId, childId }, res) => {
  const query = { deleted: null };
  if (userId) query.assigner = userId;
  if (childId) query.assignee = childId;

  const tasks = await AssignedTask.find(query)
    .populate("assignee")
    .populate("task");

  res.json(tasks);
};

/**
 * Handles assign task(s) request.
 */
const assignTask = async ({ body, userId }, res, next) => {
  const { children, task } = body;

  const parent = await Parent.findById(userId);
  const taskToAssign = await Task.findById(task).populate("difficulty");

  // Calculate total required to assign task.
  const coinsRequired = taskToAssign.difficulty.reward * children.length;

  // Make sure parent has enough money to assign tasks.
  if (parent.balance < coinsRequired)
    return next(badRequestError("Insufficient balance!"));

  const tasks = await Promise.all(
    children.map(async (child) => {
      // Assign a task to each child.
      const assignedTask = new AssignedTask({
        assignee: child,
        assigner: userId,
        task,
      });
      const savedTask = await assignedTask.save();
      return await populate(savedTask);
    })
  );

  // Remove coins from parent' balance.
  parent.balance -= coinsRequired;
  parent.save();

  res.status(201).json({ tasks, balance: parent.balance });
};

const reassignTask = async ({ resource: originalTask, userId }, res, next) => {
  // Make sure reassigned task is finished.
  if (!originalTask.finished) {
    return next(badRequestError("Cannot reassign unfinished task!"));
  }

  // Mark the original task as deleted so it wont be fetched.
  originalTask.deleted = Date.now();
  await originalTask.save();

  // Now just assign a task based on the original one...
  const { task, assignee: child } = originalTask;
  await assignTask({ body: { children: [child], task }, userId }, res, next);
};

/**
 * Handles complete task request.
 */
const completeTask = async ({ resource: task }, res) => {
  // Mark the task as finished.
  task.finished = Date.now();
  await task.save();
  await populate(task);

  // Get the difficulty.
  const difficulty = await TaskDifficulty.findById(task.task.difficulty);

  // Add money to child's account.
  const child = await Child.findById(task.assignee.id);
  child.balance += difficulty.reward;
  await child.save();

  // Return the finished task.
  res.status(200).json(task);
};

/**
 * Handles deletion of assigned task.
 */
const deleteTask = async ({ resource: task, userId }, res) => {
  task.deleted = Date.now();
  const parent = await Parent.findById(userId);

  // Refund coins to parent if task was not finished.
  if (!task.finished) {
    await task
      .populate({
        path: "task",
        populate: {
          path: "difficulty",
        },
      })
      .execPopulate();
    parent.balance -= task.task.difficulty.reward;
    parent.save();
  }

  await task.save();
  res.json({ balance: parent.balance });
};

module.exports = {
  getTasks,
  deleteTask,
  reassignTask,
  assignTask,
  completeTask,
};
