const faker = require("faker");

const Task = require("../models/task");
const TaskRoom = require("../models/taskRoom");
const TaskDifficulty = require("../models/taskDifficulty");

const data = [
  {
    name: "Imurointi",
    note: "Imuroi huolella nurkat!",
  },
  {
    name: "Kanna pyykit",
    note: "kitchen",
  },
  {
    name: "Tyjennä tiskikone",
    note: "Muista pyykkikori!",
    room: "kitchen",
  },
];

const seeder = async () => {
  await Task.collection.drop();

  const difficulties = await TaskDifficulty.find({});
  const rooms = await TaskRoom.find({});

  const tasks = data.map((task) => {
    task.room =
      rooms.find((room) => room.name == task.room) ??
      faker.random.arrayElement(rooms);
    task.difficulty = faker.random.arrayElement(difficulties);
    task.creator = null;
    return task;
  });

  await Task.insertMany(tasks);
};

module.exports = {
  data,
  seeder,
};
