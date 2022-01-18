const express = require('express')
const router = express.Router()

const { index,show, create, update, destroy } = require('../app/controllers/formController')

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router