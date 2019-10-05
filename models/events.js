const mongoose = require('mongoose');
const { Schema } = mongoose;
const Links = require('./link');

const eventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    college_name: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('events',eventSchema);
module.exports = Event;