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
   .then(result => res.status(201).json(result))
   .catch(error => res.status(400).json({message: error}))
    
})

router.put('/', (req, res) => {
    User.findById(req.params.id)
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
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json({message: error}))
        })
        .catch((error) => res.status(400).json("error" + error)) 
    
})

router.delete('/', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(202).json("User deleted"))
        .catch((error) => res.status(400).json("error" + error))   
    
})

module.exports = router;