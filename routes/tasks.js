const express = require('express');
const bodyParser = require('body-parser');
const Task = require('../models/task');

const router = express.Router();
router.use(bodyParser.json())

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
    //res.json(taskList)
    Task.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(400).json('Error' + error) )
})

router.post('/', (req, res) => {
   const task = new Task({     
       name: req.body.name,
       note: req.body.note,
       points: req.body.points,
       room: req.body.room
    })

   task.save()
   .then(result => res.status(201).json(result))
   .catch(error => res.status(400).json({message: error}))
})

router.put('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            task.name = req.body.name,
            task.note = req.body.note,
            task.points = req.body.points,
            task.room = req.body.room

            task.save()
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json({message: error}))
        })
        .catch((error) => res.status(400).json("error" + error))    
})

router.delete('/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.status(202).json("Task deleted"))
        .catch((error) => res.status(400).json("error" + error))   
})

module.exports = router;