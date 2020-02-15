const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema);