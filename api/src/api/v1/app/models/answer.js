const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true
    },
    custom_id: {
        type: String,
        required: true
    },
    field_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field'
    },
    form_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    }
},
{ timestamps: true })

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer