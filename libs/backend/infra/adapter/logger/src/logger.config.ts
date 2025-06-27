import type { LogLevel } from '@nestjs/common'

import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

// https://github.com/pinojs/pino/blob/main/docs/api.md#loggerlevels-object
// Extends `LevelMapping`, but use nestjs values
export const levelMapping = {
  values: {
    verbose: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  },
  labels: {
    10: 'verbose',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal',
  },
} as const

/**
 * Map from nestjs log levels to pino log levels
 */
export const labelMapping = {
  verbose: 'trace',
  debug: 'debug',
  log: 'info',
  warn: 'warn',
  error: 'error',
  fatal: 'fatal',
} as const

export interface ContextFilterConfig {
  level: LogLevel
  pattern: string
}

export const loggerConfig = registerAs('LOGGER_CONFIG', () => {
  return {
    get level() {
      /**
       * https://github.com/iamolegga/nestjs-pino
       */
      return get('API_LOG_LEVEL')
        .default('info')
        .asEnum(['verbose', 'debug', 'info', 'warn', 'error', 'fatal'])
    },
    get sentryDsn() {
      return get('SENTRY_DSN').required().asString()
    },
    get namespaces() {
      return get('API_LOG_NAMESPACES').default('').asString()
    },
  }
})
