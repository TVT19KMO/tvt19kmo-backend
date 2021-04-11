const TaskDifficulty = require("../models/taskDifficulty");

const getTaskDifficulties = async (req, res) => {
  const difficulties = await TaskDifficulty.find({});

  const finalDifficulties = difficulties.map((difficultyDoc) => {
    difficulty = difficultyDoc.toObject();
    difficulty.name = req.i18n.t(`difficulties.${difficulty.level}`);
    return difficulty;
  });

  res.json(finalDifficulties);
};

module.exports = {
  getTaskDifficulties,
};
