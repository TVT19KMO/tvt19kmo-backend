const getTasks = async ({ userId }, res) => {
  const tasks = await AssignedTask.find({ assigner: userId });
  res.json(tasks);
};

const assignTask = async ({ body, userId }, res) => {
  const { children, task } = body;

  const tasks = Promise.all(
    children.map(async (child) => {
      const assignedTask = new AssignedTask({
        assignee: child,
        assigner: userId,
        task,
      });
      return await assignedTask.save();
    })
  );

  res.status(201).json(tasks);
};

module.exports = {
  getTasks,
  assignTask,
};
