const Child = require("../models/child");

const data = [
  {
    name: "Lauri Lapsi",
    balance: 500,
  },
  {
    name: "Niina Napero",
    balance: 3000,
  },
  {
    name: "Taavi Taapero",
    balance: 200,
  },
];

const seeder = async () => {
  await Child.deleteMany({});
  await Child.insertMany(data);
};

module.exports = {
  data,
  seeder,
};
