const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    userFlag: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;