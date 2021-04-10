//import jwt from 'jsonwebtoken';

const jwt = require('jsonwebtoken')
//import mongoose from 'mongoose';

const mongoose = require('mongoose')
const Schema = mongoose.Schema
//import validator from 'validator';
const validator = require('validator')

/*
const isValidDate = dateString => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
};

*/

//Schema of the user
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            cast: false,
        },
        password: {
            type: String,
            required: true,
            cast: false,
        }
    }
);

/*
userSchema.virtual('token').get(function () {
    const userForToken = {
      username: this.username,
      id: this._id,
    };
  
    return jwt.sign(userForToken, process.env.SECRET);
  });

*/

const User = mongoose.model('User', userSchema)
//export const User = mongoose.model('User', userSchema);

module.exports = User

/*
export default {
  User,
  userSchema,
};
*/