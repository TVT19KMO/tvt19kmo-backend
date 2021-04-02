const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const taskRoute = require('./routes/tasks');
const rewardRoute = require('./routes/rewards');

app.use('/api/tasks', taskRoute);
app.use('/api/rewards', rewardRoute);


app.listen(port, () => console.log(`Server running in port ${port}`));

