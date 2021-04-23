const Parent = require("../models/parent");
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

  const parent = await Parent.findOne({ username: "testaaja1" });

  await Child.insertMany(
    data.map((child) => {
      child.parent = parent.id;
      child.code = Math.floor(10000000 + Math.random() * 90000000);
      return child;
    })
  );
};

module.exports = {
  data,
  seeder,
};
