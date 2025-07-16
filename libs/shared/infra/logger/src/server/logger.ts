import type { LoggerOptions } from 'pino'

import pino, { destination, multistream } from 'pino'
import pretty from 'pino-pretty'

import { LOG_FILE_PATH } from './logger.config'

export const pinoOptions: LoggerOptions = {
  // Include all levels
  level: 'trace',
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
  // {
  //   // Need to enable level for stream
  //   level: 'trace',
  //   stream: pinoPrettyStreamToFile,
  //   // stream: pinoStreamToFile,
  // },
])

export const pinoLogger = pino(pinoOptions, streams)
