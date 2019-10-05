const express = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const router = express.Router();

const collegeSchema = Schema({
    collegeName: {
        type: String,
        required: true
    },
    collegeEmail: {
        type: String,
        required: true
    },
    collegePhone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    collegeAddress: {
        type: String,
        required: true
    }
});

collegeSchema.methods.isValid = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


const College = mongoose.model('college', collegeSchema);
module.exports = College;