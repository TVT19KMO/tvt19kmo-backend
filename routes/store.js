const express = require("express");
const Hat = require("../models/hat");
const Shoe = require("../models/shoe");
const Bottom = require("../models/bottom");
const Top = require("../models/top");

const router = express.Router();

router.get('/hats', (req, res) => {
    Hat.find()
    .then(hat => res.status(200).json(hat))
    .catch(error => res.status(400).json({message: error}))
})

router.get('/shoes', (req, res) => {
    Shoe.find()
    .then(shoe => res.status(200).json(shoe))
    .catch(error => res.status(400).json({message: error}))
})

router.get('/bottoms', (req, res) => {
    Bottom.find()
    .then(bottom => res.status(200).json(bottom))
    .catch(error => res.status(400).json({message: error}))
})

router.get('/tops', (req, res) => {
    Top.find()
    .then(top => res.status(200).json(top))
    .catch(error => res.status(400).json({message: error}))
})

module.exports = router;
