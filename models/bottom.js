const mongoose = require('mongoose');

const bottomSchema = new mongoose.Schema({
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
});

const Bottom = mongoose.model('Bottom', bottomSchema);
module.exports = Bottom;