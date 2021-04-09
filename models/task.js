//import mongoose from 'mongoose';      KONSTA
//const validator = require('validator')    KONSTA
const mongoose = require('mongoose')

//import { rewardSchema } from './reward';  KONSTA

const r = require('./reward')


            //import { userSchema } from '/user';   KONSTA
//const userSchema = require('.user/userSchema')

const Schema = mongoose.Schema

/*
const isValidDate = dateString => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
};
*/
//Schema of the user
const taskSchema = new Schema(
    {
        taskName: {
            type: String,
            required: true,
            cast: false,
        },
        creatingDate: {
            type: Date,
            default: Date.now
        },
        dueDate: {
            type: String,
            date: true,
            cast: false,
        },
        once: {
            type: Boolean,
            required: true,
            cast: false,
        },
        note: {
            type: String,
            cast: false,
        },
        room: {
            type: String,
            required: true,
            cast: false,
        },
        points: {
            type: String,
            required: true,
            cast: false,
        },
        
        reward: {
            type: {type: mongoose.Schema.Types.ObjectId, ref: 'Reward'}
            //required: true,
            //cast: false,
        },
        
        assignedTo: {
            type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
            //type: userSchema,
            //required: true,
            //cast: false,
        }
        
    }
);

const Task = mongoose.model('Task', taskSchema)
module.exports = Task