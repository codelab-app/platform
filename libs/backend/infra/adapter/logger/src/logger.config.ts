import type { LogLevel } from '@nestjs/common'
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
      return env
        .get('API_LOG_LEVEL')
        .default('info')
        .asEnum(['verbose', 'debug', 'info', 'warn', 'error', 'fatal'])
    },
    get sentryDsn() {
      return env.get('SENTRY_DSN').required().asString()
    },
    get contextFilter() {
      return env
        .get('API_LOG_CONTEXT_FILTER')
        .default('')
        .asString()
        .split(',')
        .filter(Boolean)
        .map((filter): ContextFilterConfig => {
          const [level, pattern] = filter.split(':')

          if (!level || !pattern || !(level in levelMapping.values)) {
            throw new Error(`Invalid context filter format: ${filter}`)
          }

          return {
            level: level as LogLevel,
            pattern,
          }
        })
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
