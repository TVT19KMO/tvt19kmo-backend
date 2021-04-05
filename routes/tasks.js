const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const faker = require("faker");
//muutos

const NUM_TASKS = 50;

let tasks = Array.from({ length: NUM_TASKS }).reduce((acc, _) => {
  const id = uuid.v4();
  return {
    ...acc,
    [id]: {
      id,
      name: faker.random.arrayElement([
        "Empty trash",
        "Dust windowsills",
        "Dust baseboards",
        "Sort out-of-place items",
        "Make beds",
        "Carry laundry",
        "Carry laundry",
        "Vacuuming",
      ]),
      note: faker.lorem.sentence(),
      points: faker.datatype.number({ min: 10, max: 30 }),
      room: faker.random.arrayElement([
        "kitchen",
        "living room",
        "restroom",
        "bedroom",
      ]),
    },
  };
}, {});

router.get("/", (req, res) => {
  res.json(Object.values(tasks));
});

router.post("/", (req, res) => {});

router.put("/", (req, res) => {});

router.delete("/:id", ({ params: { id: taskId } }, res) => {
  delete tasks[taskId];
  res.status(204).end();
});

module.exports = router;
