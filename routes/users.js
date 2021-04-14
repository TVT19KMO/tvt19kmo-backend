const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const cAuth = require('../utils/auth')
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(bodyParser.json())


/*
*** THIS ROUTE IS FOR TESTING PURPOSE ONLY
*/

router.get('/', (req, res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error: error}))
})

/*
*** Register new user
*/

router.post('/register', (req, res) => {

    Login.findOne({ username: req.body.username }, (error, user) => {
        if(user) {
            return res.status(409).json({message: "User already exists"})
        }

        else {
            const hash_password = bcrypt.hashSync(req.body.password, 10);
            const user = new Login({     
                username: req.body.username,
                password: hash_password
            })
            
            user.save()
            .then(() => res.status(200).json({message: "New user registered"}))
            .catch(error => res.status(400).json({error: error}))

        }     
    })
    .catch(error => res.status(500).json({error: error}))
})

/*
*** Login user
*/

router.post('/login', (req, res) => {  
    Login.findOne({ username: req.body.username }, (error, user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if(result) {
                    
                    // creates access token
                    jwt.sign({username: req.body.UserName}, 'secretkey', { expiresIn: '1800s'}, (err, token) => {                    
                        return res.status(200).json({
                            Message: "Login successful",
                            Token: token,
                        })
                    })      
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

/*
*** delete user
*/

router.delete('/:id', cAuth.checkAuth, (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, result) => {
        if(result) {
            return res.status(200).json({message: "OK"})
        }
        else {
            return res.status(404).json({message: "Not found"})
        }
    })
})

/*
*** find user by id
*/

router.get('/:id', cAuth.checkAuth, (req, res) => {
    User.findById(req.params.id, (error, result) => {
        if(result) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({message: "User Not Found"})
        }
    })  
})

/*
*** create new user
*/

router.post('/', cAuth.checkAuth, (req, res) => {
    User.findOne({ email: req.body.email }, (error, email) => {
        if(email) {
            return res.status(409).json({message: "Email Already Taken"})
        }
        
        else {
            const user = new User({     
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                dateOfBirth: req.body.dateOfBirth,
                emailVerified: req.body.emailVerified,
                createDate: req.body.createDate,
                role: req.body.role,
                playTime: req.body.playTime,
                tasksDone: req.body.tasksDone,
                balance: req.body.balance
            })
            
            user.save()
            .then(() => res.status(200).json({message: "User Created"}))
            .catch(() => res.status(400).json({error: "Missing Required Information"}))

        }     
    })
    .catch(error => res.status(500).json({error: error}))
})

/*
*** update user
*/

router.put('/:id', cAuth.checkAuth, (req, res) => {
    
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
            tasksDone = req.body.tasksDone,
            balance = req.body.balance
                
            user.save()
            .then(() => res.status(200).json({message: "OK"}))
            .catch(error => res.status(400).json({error: error}))
        })
        .catch(() => res.status(400).json({error: "Not found"}))    
})


module.exports = router;