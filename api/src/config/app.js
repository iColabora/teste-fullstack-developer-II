
const express = require('express')
const app = express()
const logger = require('./logger');
const mongoose = require('../api/v1/database/config')
const db = mongoose.connection;

const formRouter = require('../api/v1/routes/form-router')
const fieldRouter = require('../api/v1/routes/field-router')
const answerRouter = require('../api/v1/routes/answer-router')

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.info("Connected to MongoDB");
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
 
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use('/api/v1/form', formRouter)
app.use('/api/v1/field', fieldRouter)
app.use('/api/v1/answer', answerRouter)

module.exports = app