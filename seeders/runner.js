require("../database/connection");

const seeders = [
  require("./parent").seeder,
  require("./taskRoom").seeder,
  require("./taskDifficulty").seeder,
  require("./task").seeder,
];

(async () => {
  console.log("Seeding database...");
  await Promise.all(seeders.map(async (seeder) => await seeder()));
  console.log("Seeding finished!");
  process.exit(0);
})();
