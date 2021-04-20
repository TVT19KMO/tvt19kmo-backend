/**
 * Handles get assigned tasks request.
 */
const getTasks = async ({ userId }, res) => {
  const tasks = await AssignedTask.find({ assigner: userId });
  res.json(tasks);
};

/**
 * Handles assign task(s) request.
 */
const assignTask = async ({ body, userId }, res) => {
  const { children, task } = body;

  // TODO: Make sure parent has enough money to create tasks.
  // TODO: Remove money from parent's balance.

  const tasks = Promise.all(
    children.map(async (child) => {
      // Assign a task for each child.
      const assignedTask = new AssignedTask({
        assignee: child,
        assigner: userId,
        task,
      });
      return await assignedTask.save();
    })
  );

  // Return the assigned tasks.
  res.status(201).json(tasks);
};

/**
 * Handles complete task request.
 */
const completeTask = async ({ resource: task }, res) => {
  // Mark the task as finished.
  task.finished = Date.now();
  await task.save();

  // Add money to child's account.
  const child = await Child.findById(task.assignee);
  child.balance += 50;
  await child.save();

  // Return the finished task.
  res.status(203).json(task);
};

module.exports = {
  getTasks,
  assignTask,
  completeTask,
};
