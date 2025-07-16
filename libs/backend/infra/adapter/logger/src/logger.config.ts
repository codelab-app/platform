import type { LogLevel } from '@nestjs/common'

import { LOG_LEVELS, parseNamespaces } from '@codelab/shared-infra-logger'
import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

// https://github.com/pinojs/pino/blob/main/docs/api.md#loggerlevels-object
// Map shared LOG_LEVELS to Pino's numeric scale (multiplied by 10)
export const levelMapping = {
  values: Object.fromEntries(
    Object.entries(LOG_LEVELS).map(([level, priority]) => [
      level,
      priority * 10,
    ]),
  ) as Record<LogLevel, number>,
  labels: Object.fromEntries(
    Object.entries(LOG_LEVELS).map(([level, priority]) => [
      priority * 10,
      level,
    ]),
  ) as Record<number, LogLevel>,
} as const

/**
 * Map from nestjs/our log levels to pino log levels
 * Note: NestJS uses 'log' but we use 'info'
 */
export const labelMapping = {
  verbose: 'trace',
  debug: 'debug',
  info: 'info',
  // Map NestJS 'log' to 'info'
  log: 'info',
  warn: 'warn',
  error: 'error',
  fatal: 'fatal',
} as const

export interface ContextFilterConfig {
  level: LogLevel
  pattern: string
}

/**
 * Validates API_DEBUG environment variable
 * Uses shared validation logic
 */
const validateApiDebug = (value: string): string => {
  if (!value) {
    // Empty is valid
    return value
  }

  // Just parse to validate format - actual namespace validation happens at runtime
  parseNamespaces(value)

  return value
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
    get debug() {
      const value = get('API_DEBUG').default('').asString()

      // Validate the value
      try {
        validateApiDebug(value)
      } catch (error) {
        throw new Error(
          `Invalid API_DEBUG value: ${
            error instanceof Error ? error.message : String(error)
          }`,
        )
      }

      return value
    },
  }
})
