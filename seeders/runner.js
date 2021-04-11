require("../database/connection");
const { seeder: taskRoomSeeder } = require("./taskRoom");
const { seeder: taskDifficultySeeder } = require("./taskDifficulty");
const { seeder: taskSeeder } = require("./task");

(async () => {
  console.log("Seeding database...");
  await taskRoomSeeder();
  await taskDifficultySeeder();
  await taskSeeder();

  console.log("Seeding finished!");
  process.exit(0);
})();
