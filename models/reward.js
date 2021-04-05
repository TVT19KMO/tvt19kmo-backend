import mongoose from 'mongoose';

export const rewardSchema = mongoose.Schema(
    {
        price: {
            type: String,
            required: true,
            cast: false,
        }
    }
);