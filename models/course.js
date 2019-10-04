const mongoose = require('mongoose');
const { Schema } = mongoose;
const Lecture = require('./lecture');
const Comment = require('./comment');

const courseSchema = Schema({
    courseName: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
        required: true
    },
    lectures: {
        type: [Lecture],
        required: true
    },
    comments: {
        type: [Comment],
        required: true
    }
});

const Course = mongoose.model('couse',courseSchema);
module.exports = Course;