const mongoose = require('mongoose')

const Schema = mongoose.Schema

const topSchema = new Schema({
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

const Top = mongoose.model('Top', topSchema)
module.exports = Top