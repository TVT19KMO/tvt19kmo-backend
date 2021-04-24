//import mongoose from 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  price: {
    type: String,
    required: true,
    cast: false,
  },
});

const Reward = mongoose.model("Reward", rewardSchema);
module.exports = Reward;
