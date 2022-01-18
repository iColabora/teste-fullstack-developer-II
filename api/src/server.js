const app = require('./config/app')
const http = require('http')
const https = require('https')
require('dotenv').config()
const { logger } = require('./config/logger')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

const isProduction = process.env.NODE_ENV === 'production'
const security = process.env.NODE_SSL ? https : http;

const localHostSSL = {
    key: '',
    cert: ''
}

const server = http.createServer(localHostSSL, app)

const startServer = () => {
    const { address, port } = server.address()
    logger.info(`Server listening on http://${address}:${port}`)
}

server.listen(PORT, HOST, startServer)