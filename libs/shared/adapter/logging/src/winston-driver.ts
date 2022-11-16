import safeStringify from 'fast-safe-stringify'
import { inspect } from 'util'
import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  // level: 'info',
  // https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/#formatting-your-log-messages
  format: format.combine(
    // splat(),
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    // json(),
    // align(),
    format.printf((info) => {
      const { level, message, timestamp, ...meta } = info
      const stringifiedMeta = safeStringify(meta)

      const formattedMeta = inspect(JSON.parse(stringifiedMeta), {
        depth: null,
      })

      return `[${timestamp}] ${level}: ${message} \n${formattedMeta}\n`
    }),
    // format.prettyPrint(),
  ),

  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.Console({
      level: 'info',
    }),

    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env['NODE_ENV'] !== 'production') {
//   logger.add(
//     new transports.Console({
//       format: format.simple(),
//     }),
//   )
// }
