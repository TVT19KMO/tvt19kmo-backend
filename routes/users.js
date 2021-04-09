const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');

const router = express.Router();
router.use(bodyParser.json())

router.get('/', (req, res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json('Error' + error) )
})

router.post('/', (req, res) => {
    const user = new User({     
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        emailVerified: req.body.emailVerified,
        createDate: req.body.createDate,
        role: req.body.role,
        playTime: req.body.playTime,
        tasksDone: req.body.tasksDone
    })

   user.save()
   .then(() => res.status(201).json("Use created"))
   .catch(error => res.status(400).json({message: error}))
    
})

router.put('/:id', (req, res) => {
    
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(user => {
            firstName = req.body.firstName,
            lastName = req.body.lastName,
            email = req.body.dueDemailate,
            dateOfBirth = req.body.dateOfBirth,
            emailVerified = req.body.emailVerified,
            createDate = req.body.createDate,
            role = req.body.role,
            playTime = req.body.playTime,
            tasksDone = req.body.tasksDone
                
            user.save()
            .then(() => res.status(200).json("User updated"))
            .catch(error => res.status(400).json({message: error}))
        })
        .catch((error) => res.status(400).json("error" + error)) 
    
})

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(202).json("User deleted"))
        .catch((error) => res.status(400).json("error" + error))   
    
})

module.exports = router;