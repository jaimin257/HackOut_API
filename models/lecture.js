const mongoose = require('mongoose');
const { Schema } = mongoose;
const Links = require('./link');

const lectureSchema = Schema({
    description: {
        type: String,
        required: true
    },
    lectureLinks: {
        type: [Links],
        required: true
    }
});

const Lecture = mongoose.model('lecture',lectureSchema);
module.exports = Lecture;