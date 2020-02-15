const  mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Comment', commentSchema);