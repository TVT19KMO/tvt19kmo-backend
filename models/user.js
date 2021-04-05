import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';

const isValidDate = dateString => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
};


//Schema of the user
export const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            cast: false,
        },
        lastName: {
            type: String,
            required: true,
            cast: false,
        },
        email: {
            type: String,
            required: true,
            cast: false,
            email: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
            validator: isValidDate,
            cast: false,
        },
        emailVerified: {
            type: Boolean,
            cast: false,
        },
        createDate: {
            type: String,
            validate: isvalidDate,
            cast: false,
        },
        role: {
            type: String,
            enumerable: true,
            cast: false,
        },
        playTime: {
            type: String,
            cast: false,
        },
        tasksDone: {
            type: String,
            cast: false,
        }
    }
);

userSchema.virtual('token').get(function () {
    const userForToken = {
      username: this.username,
      id: this._id,
    };
  
    return jwt.sign(userForToken, process.env.SECRET);
  });

export const User = mongoose.model('User', userSchema);

export default {
  User,
  userSchema,
};