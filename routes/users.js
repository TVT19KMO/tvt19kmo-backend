const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(bodyParser.json())

router.get('/', (req, res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error: error}))
})

router.post('/register', (req, res) => {

    User.findOne({ username: req.body.username }, (error, user) => {
        if(user) {
            return res.status(403).json({message: "User already exists"})
        }

        else {
            const hash_password = bcrypt.hashSync(req.body.password, 10);
            const user = new User({     
                username: req.body.username,
                password: hash_password
            })
            
            user.save()
            .then(() => res.status(200).json({message: "New user added"}))
            .catch(error => res.status(400).json({error: error}))

        }     
    })
    .catch(error => res.status(500).json({error: error}))
})

router.post('/login', (req, res) => {  
    User.findOne({ username: req.body.username }, (error, user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, function(error, result){
                if(result) {
                    return res.status(200).json({message: "Login successfull"})
                }               
                else {
                    return res.status(401).json({message: "Invalid password"})
                }
               })
        }
        else {
            return res.status(400).json({message: "Invalid username"})
        }
    })
    .catch(error => res.status(500).json({error: error}))
})

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, result) => {
        if(result) {
            return res.status(200).json({message: "User deleted"})
        }
        else {
            return res.status(400).json({message: "Not found"})
        }
    })
})

module.exports = router;