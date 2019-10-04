const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    } ,
    comment_text: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;