const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Lecture = require('./lecture');
const Comment = require('./comment');

const courseSchema = Schema({
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
        required: true
    },
    courseMaterial: {
        type: String,
        required: true
    },
    collegeEmail: {
        type: String,
        required: true
    }
    // comments: {
    //     type: [Comment],
    //     required: true
    // }
});

const Course = mongoose.model('course',courseSchema);
module.exports = Course;