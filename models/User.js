const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps:true}); // Remove closing parenthesis here

const User = mongoose.model('User', userSchema); // Add missing comma here

module.exports = User