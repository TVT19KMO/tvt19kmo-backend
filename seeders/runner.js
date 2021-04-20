require("../database/connection");

const seeders = [
  require("./parent").seeder,
  require("./taskRoom").seeder,
  require("./taskDifficulty").seeder,
];

const subseeders = [require("./task").seeder, require("./child").seeder];

const subsubseeders = [require("./assignedTask").seeder];

(async () => {
  console.log("Seeding database...");
  await Promise.all(seeders.map(async (seeder) => await seeder()));
  await Promise.all(subseeders.map(async (seeder) => await seeder()));
  await Promise.all(subsubseeders.map(async (seeder) => await seeder()));
  console.log("Seeding finished!");
  process.exit(0);
})();
