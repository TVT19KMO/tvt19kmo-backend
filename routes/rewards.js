const express = require('express');
const bodyParser = require('body-parser');
const Reward = require('../models/reward');
const cAuth = require('../utils/auth')
const router = express.Router();

/*
*** THIS ROUTE IS FOR TESTING PURPOSE ONLY
*/

router.get('/', (req, res) => {
    Reward.find()
    .then(rewards => res.status(200).json(rewards))
    .catch(error => res.status(400).json({error: error}))
})

/*
*** find reward by id
*/

router.get('/:id', (req, res) => {
    Reward.findById(req.params.id, (error, result) => {
        if(result) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({message: "Not Found"})
        }
    })  
})

/*
*** create new reward
*/

router.post('/', (req, res) => {
    const reward = new Reward({     
        price: req.body.price
    })

   reward.save()
   .then(() => res.status(200).json("Ok"))
   .catch(() => res.status(400).json({error: "Bad Request"}))
    
})

/*
*** update reward
*/

router.put('/:id', (req, res) => {

    Reward.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(reward => {
            price: req.body.price

            reward.save()
            .then(() => res.status(200).json({ message: "OK" }))
            .catch((error) => res.status(400).json({ message: error }));
        })
        .catch(() => res.status(500).json({ message: "Not found" }));
})

/*
*** delete reward by id
*/

router.delete('/:id', (req, res) => {
    Reward.findByIdAndDelete(req.params.id, (error, result) => {
        if(result) {
            return res.status(200).json({message: "OK"})
        }
        else {
            return res.status(404).json({message: "Not found"})
        }
    })
    
})

module.exports = router;