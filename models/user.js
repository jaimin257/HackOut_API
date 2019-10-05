const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    gender: {
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
    },
    college: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.methods.isValid = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};



const User = mongoose.model('user', userSchema);
module.exports = User;