const { createLogger, format, transports } = require('winston')

const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'aou-api-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.File({ filename: 'aou-api-service-error.log', level: 'error' }),
      new transports.File({ filename: 'aou-api-service.log' })
    ]
  })

module.exports = logger
