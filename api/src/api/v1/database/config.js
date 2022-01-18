const mongoose = require('mongoose')
require('dotenv').config()

const DB = process.env.DB_CONNECTION || ''
const DB_CLUSTER = process.env.DB_CLUSTER || '';
const DB_USER = process.env.DB_USER || ''
const DB_PASS = process.env.DB_PASS || ''

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.fnwzl.mongodb.net/${DB}?retryWrites=true&w=majority`)
mongoose.Promise = global.Promise

module.exports = mongoose