const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello You' })
})

router.post('/', (req, res) => {
    
})

router.put('/', (req, res) => {
    
})

router.delete('/', (req, res) => {
    
})

module.exports = router;