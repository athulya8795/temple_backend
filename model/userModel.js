// import mongoose
const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    profileImg: {
        type: String,
        default: ""
    }
})

// create model
const users = mongoose.model("users", userShema)
module.exports = users