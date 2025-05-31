import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    age: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

export const User = mongoose.model('user', userSchema) 