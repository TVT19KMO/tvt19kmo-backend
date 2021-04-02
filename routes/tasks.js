const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

var taskList = [
    {
        "Name": "Vacuuming",
        "Note": "Vacuum under sofa",
        "Points": 20,
        "Room": "Livingroom"
    }, 
    {
        "Name": "Empty trash",
        "Note": "Empty kitchen trash can",
        "Points": 10,
        "Room": "Kitchen"
    },
    {
        "Name": "Wash dishes",
        "Note": "Washe dishes at kitchen",
        "Points": 30,
        "Room": "Kitchen"
    },
    {
        "Name": "Dust",
        "Note": "Dust tables",
        "Points": 15,
        "Room": "Livingroom"
    },
    {
        "Name": "Vacuuming",
        "Note": "Vacuum bedroom",
        "Points": 20,
        "Room": "Bedroom"
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