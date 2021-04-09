const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hatSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true },
    color: {
        type: String,
        required: true,
        trim: true },
	price: {
		type: Number,
		required: true }
})

const Hat = mongoose.model('Hat', hatSchema)
module.exports = Hat