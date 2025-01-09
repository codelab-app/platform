import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ILoggerService, LogOptions } from '@codelab/shared/infra/logging'
import type { LogLevel } from '@nestjs/common'
import type { LoggerOptions } from 'pino'

import { getEnv } from '@codelab/shared/config/env'

/**
 * Send to server endpoint so we can log to file, other wise browser side has no way to log to file
 */
const sendLog = async (
  level: LogLevel,
  message: unknown,
  options: LogOptions,
) => {
  const baseUrl = getEnv().endpoint.webHost

  try {
    await fetch(`${baseUrl}/api/logging`, {
      body: JSON.stringify({ level, message, options }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  } catch (error) {
    // Fallback to console in case the logging endpoint fails
    console.error('Failed to send log to server:', error, {
      level,
      message,
      options,
    })
  }
}

/**
 * We don't do any logging in the browser, we send information to api and do logging there, which allows optional logging to file
 */
export const logger: ILoggerService = {
  debug: (message: string, options: LogOptions) =>
    sendLog('debug', message, options),
  error: (message: string, options: LogOptions) =>
    sendLog('error', message, options),
  log: (message: string, options: LogOptions) =>
    sendLog('log', message, options),
  verbose: (message: string, options: LogOptions) =>
    sendLog('verbose', message, options),
  warn: (message: string, options: LogOptions) =>
    sendLog('warn', message, options),
}
