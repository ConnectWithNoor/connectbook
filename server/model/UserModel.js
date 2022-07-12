import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
    },
    coverPicture: {
        type: String,
    },
    about: {
        type: String,
        min: 10,
        default: "I am an interesting person",
    },
    livesIn: {
       type: String,
        default: "My land",  
    },
    worksAt: {
       type: String,
        default: "My Workplace",  
    },
    relationshipStatus: {
       type: String,
        default: "relationshipStatus",  
    },
    followers: {
        type: Array,
        default: []
    },
        following: {
        type: Array,
        default: []
    },

}, {timestamps: true})

const userModel = mongoose.model('user', UserSchema)

export default userModel