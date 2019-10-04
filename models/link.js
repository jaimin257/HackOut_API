const mongoose = require('mongoose');
const { Schema } = mongoose;

const linkSchema = Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const Link = mongoose.model('link',linkSchema);
module.exports = Link;