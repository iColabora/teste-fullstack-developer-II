const express = require('express')
const router = express.Router()

const { create } = require('../app/controllers/answerController')

router.post('/', create)

module.exports = router