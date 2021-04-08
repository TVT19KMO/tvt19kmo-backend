const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
   
    name: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3},
    note: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3},
    points: {
        type: Number,
        required: true},
    room: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3}
        
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task