const Field = require('../models/field')

const index = async (req, res) => {
    try {
        const forms = await Field.find({ form_id: req.params.id })
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
        const form = await Field.find({ form_id: req.params.id })
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
        const form = await Field.create(req.body)
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
        const form = await Field.updateOne({ _id: req.body._id }, {...req.body})
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
        const form = await Field.deleteOne({ _id: req.params.id})
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