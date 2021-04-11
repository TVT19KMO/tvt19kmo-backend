const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

require("./database/connection");

const i18next = require("i18next");
const Backend = require("i18next-node-fs-backend");
const middleware = require("i18next-http-middleware");
const cors = require("cors");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "fi"],
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "locales/{{lng}}/{{ns}}.json",
    },
  });

app.use(middleware.handle(i18next));
app.use(cors());
app.use(express.json());

const taskRoute = require("./routes/tasks");
const rewardRoute = require("./routes/rewards");
const userRoute = require("./routes/users");
const paymentsRoute = require("./routes/payments");
const productsRoute = require("./routes/products");
const miscRoute = require("./routes/misc");

app.use("/api/tasks", taskRoute);
app.use("/api/rewards", rewardRoute);
app.use("/api/users", userRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/products", productsRoute);
app.use("/api", miscRoute);

app.get("/", (_, res) => {
  res.send("Welcome to game-management-api. This is main page");
});

app.listen(port, () => console.log(`Server running in port ${port}`));
