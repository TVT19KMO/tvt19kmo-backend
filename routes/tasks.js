const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
// tasks
var taskList = [
    {
        "name": "Vacuuming",
        "note": "Vacuum under sofa",
        "points": 20,
        "room": "Livingroom"
    }, 
    {
        "name": "Empty trash",
        "note": "Empty kitchen trash can",
        "points": 10,
        "room": "Kitchen"
    },
    {
        "name": "Wash dishes",
        "note": "Washe dishes at kitchen",
        "points": 30,
        "room": "Kitchen"
    },
    {
        "name": "Dust",
        "note": "Dust tables",
        "points": 15,
        "room": "Livingroom"
    },
    {
        "name": "Vacuuming",
        "note": "Vacuum bedroom",
        "points": 20,
        "room": "Bedroom"
    }]

router.get('/', (req, res) => {
    res.json(taskList)
})

router.post('/', (req, res) => {
    
})

router.put('/', (req, res) => {
    
})

router.delete('/', (req, res) => {
    
})

module.exports = router;