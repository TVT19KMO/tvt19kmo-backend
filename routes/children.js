const router = require("express").Router();
const Child = require('../models/child')

router.get('/', async (req, res) => {
  res.json(await Child.find({}))
})

module.exports = router;


