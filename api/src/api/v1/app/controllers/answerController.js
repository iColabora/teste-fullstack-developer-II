const Answer = require('../models/answer')

const create = async (req, res) => {
    try {
        const form = await Answer.insertMany(req.body)
        res.status(201).json({
            status: 'success',
            data: form
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

module.exports = { create }