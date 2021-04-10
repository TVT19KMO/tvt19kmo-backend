const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('./database/connection')

var cors = require('cors')
app.use(cors())

const taskRoute = require('./routes/tasks');
const rewardRoute = require('./routes/rewards');
const userRoute = require('./routes/users');

app.use('/api/tasks', taskRoute);
app.use('/api/rewards', rewardRoute);
app.use('/api/users', userRoute);

app.get('/', (req,res) => {
    res.send("Welcome to game-management-api");
});

app.listen(port, () => console.log(`Server running in port ${port}`));

