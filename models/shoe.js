const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shoeSchema = new Schema({
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

const Shoe = mongoose.model('Shoe', shoeSchema)
module.exports = Shoe