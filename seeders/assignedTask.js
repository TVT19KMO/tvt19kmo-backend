const faker = require("faker");
const { Child, Task, Parent, AssignedTask } = require("../models");
const _ = require("lodash");

const seeder = async () => {
  await AssignedTask.collection.drop();

  const parent = await Parent.findOne({ username: "testaaja1" });
  const children = await Child.find({ parent: parent.id });
  const tasks = await Task.find({ creator: null });

  await AssignedTask.insertMany(
    _.range(0, 5).map((_) => ({
      assigner: parent.id,
      task: faker.random.arrayElement(tasks).id,
      assignee: faker.random.arrayElement(children).id,
    }))
  );
};

module.exports = {
  seeder,
};
