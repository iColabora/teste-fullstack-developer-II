const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    form_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    id: {
        type: String,
        required: true
    },
    combo_options: {
        type: String,
        required: false
    }
},
{ timestamps: true })

const Field = mongoose.model('Field', fieldSchema)
module.exports = Field