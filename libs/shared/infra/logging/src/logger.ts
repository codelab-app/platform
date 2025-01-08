import type { LoggerOptions } from 'pino'

import pino, { destination, multistream } from 'pino'
import pretty from 'pino-pretty'

import type { ILoggerService } from './logger.interface'
import type { LogOptions } from './pino'

import { LOG_FILE_PATH, LOGS_DIR } from './logger.config'

export const pinoOptions: LoggerOptions = {
  // Include all levels
  level: 'trace',
  mixin: () => ({ context: 'server' }),
}

const pinoPrettyStreamToConsole = pretty({
  colorize: true,
  ignore: 'pid,hostname,req,res',
  /**
   * Transport requires it's own level
   */
  sync: true,
})

/**
 * This has no pretty, just raw binary output to file
 */
const pinoStreamToFile = destination({
  destination: LOG_FILE_PATH,
  mkdir: true,
  sync: true,
})

const pinoPrettyStreamToFile = pretty({
  // Cannot have color for raw string
  colorize: false,
  destination: LOG_FILE_PATH,
  mkdir: true,
  // ignore: 'pid,hostname,req,res',
  /**
   * Transport requires it's own level
   */
  sync: true,
})

/**
 * https://github.com/pinojs/pino-pretty/issues/504
 *
 * Using stream instead of inline string is better for type safety
 */
const streams = multistream([
  {
    // Need to enable level for stream
    level: 'trace',
    stream: pinoPrettyStreamToConsole,
  },
  {
    // Need to enable level for stream
    level: 'trace',
    stream: pinoPrettyStreamToFile,
    // stream: pinoStreamToFile,
  },
])

const pinoLogger = pino(pinoOptions, streams)

export const serverLogger: ILoggerService = {
  debug: (message: string, options?: LogOptions) => {
    console.log('debug')
    pinoLogger.debug(message, { ...options })
  },
  error: (message: string, options?: LogOptions) => {
    console.log('error')
    pinoLogger.error(message, { ...options })
  },
  log: (message: string, options?: LogOptions) => {
    console.log('info')

    return pinoLogger.info(message, { ...options })
  },
  verbose: (message: string, options?: LogOptions) => {
    console.log('verbose')
    pinoLogger.trace(message, { ...options })
  },
  warn: (message: string, options?: LogOptions) => {
    console.log('warn')
    pinoLogger.warn(message, { ...options })
  },
}
