import type { UnknownObjectLike } from '@codelab/shared-abstract-types'

/**
 * Shared log levels used by both frontend and backend loggers
 */
export type LogLevel = 'debug' | 'error' | 'fatal' | 'info' | 'verbose' | 'warn'

/**
 * Log level priority mapping
 * Lower numbers = higher verbosity
 */
export const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 1,
  error: 4,
  fatal: 5,
  info: 2,
  verbose: 0,
  warn: 3,
} as const

/**
 * Shared log context interface
 */
export interface LogContext {
  [key: string]: unknown
  context?: string
  data?: UnknownObjectLike
}

/**
 * Shared logger configuration
 */
export interface LoggerConfig {
  format: 'compact' | 'json' | 'pretty'
  level: LogLevel
  namespaces: string
}

/**
 * Check if a log level is enabled based on configured threshold
 */
export const isLevelEnabled = (
  currentLevel: LogLevel,
  configuredLevel: LogLevel,
): boolean => {
  return LOG_LEVELS[currentLevel] >= LOG_LEVELS[configuredLevel]
}

/**
 * Log levels that should include the data field
 */
export const DATA_INCLUSIVE_LEVELS: ReadonlyArray<LogLevel> = [
  'verbose',
  'debug',
  'error',
  'fatal',
] as const

/**
 * Check if data should be included for a given log level
 */
export const shouldIncludeData = (level: LogLevel): boolean => {
  return DATA_INCLUSIVE_LEVELS.includes(level)
}
