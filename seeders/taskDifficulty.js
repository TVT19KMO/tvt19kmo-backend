const TaskDifficulty = require("../models/taskDifficulty");

const data = [
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

const seeder = async () => {
  await TaskDifficulty.collection.drop();
  await TaskDifficulty.insertMany(data);
};

module.exports = {
  data,
  seeder,
};
