import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String, 
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

export const UserModel = mongoose.model('User', userSchema);