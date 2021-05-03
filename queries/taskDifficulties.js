const _ = require("lodash");
const TaskDifficulty = require("../models/taskDifficulty");

const colors = {
  1: "#0f0",
  2: "#ff0",
  3: "#f00",
};

const getTaskDifficulties = async (req, res) => {
  const difficulties = await TaskDifficulty.find({});

  const finalDifficulties = difficulties.map((difficultyDoc) => {
    difficulty = difficultyDoc.toObject();
    difficulty.name = req.i18n.t(`difficulties.${difficulty.level}`);
    return difficulty;
  });

  res.json(finalDifficulties);
};

const getTaskDifficultyCount = async (tasks, i18n) => {
  // Get all available difficulties.
  const taskDifficulties = await TaskDifficulty.find({});

  // Get difficulties from tasks.
  const difficulties = _.map(tasks, ({ task }) => task.difficulty.id);

  // Count difficulties by id.
  const difficultiesByCount = _.countBy(difficulties);

  const dataset = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };

  return taskDifficulties.reduce((acc, { id, level }) => {
    if (!difficultiesByCount[id]) return acc;
    acc.labels.push(i18n.t(`difficulties.${level}`));
    acc.datasets[0].data.push(difficultiesByCount[id]);
    acc.datasets[0].backgroundColor.push(colors[level]);
    return acc;
  }, dataset);
};

module.exports = {
  getTaskDifficulties,
  getTaskDifficultyCount,
};
