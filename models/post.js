const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    comment: {
        type: [Comment],
        required: true
    }
});

const Post = mongoose.model('post',postSchema);
module.exports = Post;