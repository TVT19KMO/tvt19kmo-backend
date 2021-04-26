// @ts-check

const { config } = require("dotenv");
config();
const express = require("express");
require("express-async-errors");
const { mw, stripe } = require("./app/utils");
const cors = require("cors");
const i18n = require("./locales/i18n");
const morgan = require("morgan");

const {
  tasks,
  rewards,
  payments,
  users,
  children,
  products,
  misc,
  assignedTasks,
} = require("./routes");

const storeRoute = require("./routes/store");
const statisticsRoute = require("./routes/statistics")

const app = express();
const PORT = process.env.PORT || 5000;

require("./database/connection");

app.use(i18n());
app.use(cors());
app.use(morgan("combined"));
app.use(stripe.webhook);

app.get("/", (_, res) => {
  res.send("Welcome to game-management-api!");
});

app.use("/api/tasks", tasks);
app.use("/api/rewards", rewards);
app.use("/api/users", users);
app.use("/api/payments", payments);
app.use("/api/products", products);
app.use("/api/children", children);
app.use("/api/assigned-tasks", assignedTasks);
app.use("/api/store", storeRoute);
app.use("/api/statistics", statisticsRoute)
app.use("/api", misc);

app.use(mw.unknownHandler);
app.use(mw.errorHandler);

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
