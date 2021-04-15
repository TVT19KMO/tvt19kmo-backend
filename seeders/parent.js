const bcrypt = require("bcrypt");
const Parent = require("../models/parent");

const data = [
  {
    username: "testaaja123",
    email: "testaaja123@test.com",
    passwordHash: bcrypt.hashSync("testaaja", 10),
  },
  {
    username: "testaaja1",
    email: "testaaja1@test.com",
    passwordHash: bcrypt.hashSync("testaaja", 10),
  },
  {
    username: "testaaja2",
    email: "testaaja2@test.com",
    passwordHash: bcrypt.hashSync("testaaja", 10),
  },
];

const seeder = async () => {
  await Parent.deleteMany({});
  await Parent.insertMany(data);
};

module.exports = {
  data,
  seeder,
};
