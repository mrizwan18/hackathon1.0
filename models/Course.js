const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    code: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        reuired: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);