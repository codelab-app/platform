import type { LevelMapping } from 'pino'

import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

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

export const loggerConfig = registerAs('LOGGER_CONFIG', () => {
  return {
    get level() {
      /**
       * https://github.com/iamolegga/nestjs-pino
       */
      return env
        .get('API_LOG_LEVEL')
        .default('info')
        .asEnum(['verbose', 'debug', 'info', 'warn', 'error', 'fatal'])
    },
    get sentryDsn() {
      return env.get('SENTRY_DSN').required().asString()
    },
    get disableLogForContext() {
      return env
        .get('API_LOG_DISABLE_LOG_FOR_CONTEXT')
        .default('')
        .asString()
        .split(',')
        .filter(Boolean)
    },
    get enableDataForContext() {
      return env
        .get('API_LOG_ENABLE_DATA_FOR_CONTEXT')
        .default('')
        .asString()
        .split(',')
        .filter(Boolean)
    },
  }
})
