const TaskRoom = require("../models/taskRoom");

const data = [
  {
    code: "living_room",
  },
  {
    code: "bathroom",
  },
  {
    code: "kitchen",
  },
  {
    code: "dining_room",
  },
  {
    code: "bedroom",
  },
];

const seeder = async () => {
  await TaskRoom.collection.drop();
  await TaskRoom.insertMany(data);
};

module.exports = {
  data,
  seeder,
};
