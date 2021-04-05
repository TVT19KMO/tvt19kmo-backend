import mongoose from 'mongoose';
import { rewardSchema } from './reward';
import { userSchema } from './user';

const isValidDate = dateString => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
};

//Schema of the user
export const taskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
            cast: false,
        },
        creatingDate: {
            type: String,
            validator: isvalidDate,
            date: true,
            cast: false,
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
            type: rewardSchema,
            required: true,
            cast: false,
        },
        assignedTo: {
            type: userSchema,
            required: true,
            cast: false,
        }
    }
);