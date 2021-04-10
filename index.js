const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("./database/connection");

var cors = require("cors");
app.use(cors());

const taskRoute = require("./routes/tasks");
const rewardRoute = require("./routes/rewards");
const userRoute = require("./routes/users");
const paymentsRoute = require("./routes/payments");
const productsRoute = require("./routes/products");

app.use('/api/tasks', taskRoute);
app.use('/api/rewards', rewardRoute);
app.use('/api/users', userRoute);
app.use('/api/payments', paymentsRoute);
app.use('/api/products', productsRoute);


app.get('/', (req,res) => {
    res.send("Welcome to game-management-api");
});

app.listen(port, () => console.log(`Server running in port ${port}`));
