// models/user.model.js
const mongoose = require('mongoose');

// Define a User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create and export the User model
const User = mongoose.model('Tyler', userSchema);
module.exports = User;
