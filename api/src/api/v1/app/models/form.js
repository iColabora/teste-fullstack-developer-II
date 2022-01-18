const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    }
},
{ timestamps: true })

const Form = mongoose.model('Form', formSchema)

module.exports = Form