const express = require('express');
const bodyParser = require('body-parser');
const Task = require('../models/task');

const router = express.Router();
router.use(bodyParser.json())

router.get('/', (req, res) => {
    //res.json(taskList)
    Task.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(400).json('Error' + error) )
})

router.post('/', (req, res) => {
   const task = new Task({     
        taskName: req.body.taskName,
        creatingDate: req.body.creatingDate,
        dueDate: req.body.dueDate,
        once: req.body.once,
        note: req.body.note,
        room: req.body.room,
        points: req.body.points,
        reward: req.body.reward,
        assignedTo: req.body.assignedTo
    })

   task.save()
   .then(result => res.status(201).json(result))
   .catch(error => res.status(400).json({message: error}))
})

router.put('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            taskName = req.body.taskName,
            creatingDate = req.body.creatingDate,
            dueDate = req.body.dueDate,
            once = req.body.once,
            note = req.body.note,
            room = req.body.room,
            points = req.body.points,
            reward = req.body.reward,
            assignedTo = req.body.assignedTo

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