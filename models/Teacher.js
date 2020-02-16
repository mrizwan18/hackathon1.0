const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true
    }
})

module.exports = mongoose.model('Teacher', teacherSchema);