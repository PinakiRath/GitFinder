import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    plan: {
        type: String,
        enum: ['free', 'pro'],
        default: 'free'
    },
    dailyUsage: {
        count: {
            type: Number,
            default: 0
        },
        lastReset: {
            type: Date,
            default: Date.now
        }
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export default User;
