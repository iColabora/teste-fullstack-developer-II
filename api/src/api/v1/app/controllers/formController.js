const Form = require('../models/form')
const Field = require('../models/field')

const index = async (req, res) => {
    try {
        if(req.query.q) {
            const query = new RegExp(req.query.q, "i");
            const form = await Form.find({ "name": query }).sort({createdAt: 'descending'})
            return res.status(200).json({
                status: 'success',
                data: form
            })
        }
        const forms = await Form.find({}).sort({createdAt: 'descending'})
        res.status(200).json({
            status: 'success',
            data: forms
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

const show = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id)
        res.status(200).json({
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

const create = async (req, res) => {
    try {
        const form = await Form.create(req.body)
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

const update = async (req, res) => {
    try {
        const form = await Form.update(req.params.id, req.body)
        res.status(200).json({
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

const destroy = async (req, res) => {
    try {
        const form = await Form.delete(req.params.id)
        res.status(200).json({
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

module.exports = { index, show, create, update, destroy }