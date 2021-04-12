const mongoose = require('mongoose');

const topSchema = new mongoose.Schema({
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

const Top = mongoose.model('Top', topSchema);
module.exports = Top;