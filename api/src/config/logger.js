const pino = require('pino')

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname'
        }
      }
})


module.exports = { logger }