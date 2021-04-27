const express = require("express");
const AssignedTask = require("../models/assignedTask");

const router = express.Router();

/*
*** get assigned tasks by id
*/
router.get('/:id', (req,res) => {
    
    const parentId = req.params.id
    
    AssignedTask.find({assigner: parentId}) 
        .populate('task', { difficulty: 1, name: 1, note:1 })
        .populate('assignee', { balance: 1, name: 1 })
        .then(stats => res.status(200).json(stats))
        .catch(error => res.status(400).json({message: error}))
    })  
    
module.exports = router;

