import type { UnknownObjectLike } from '@codelab/shared/abstract/types'

/**
 * Browser-compatible logger service that mirrors the backend Pino logger's
 * namespace filtering and level control functionality.
 */

export type LogLevel = 'debug' | 'error' | 'fatal' | 'info' | 'verbose' | 'warn'

export interface LogContext {
  [key: string]: unknown
  context?: string
  data?: UnknownObjectLike
}

export interface BrowserLoggerConfig {
  format: 'compact' | 'json' | 'pretty'
  level: LogLevel
  namespaces: string
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 1,
  error: 4,
  fatal: 5,
  info: 2,
  verbose: 0,
  warn: 3,
}

export class BrowserLoggerService {
  constructor(config?: Partial<BrowserLoggerConfig>) {
    this.config = {
      format: (config?.format ||
        process.env.NEXT_PUBLIC_LOG_FORMAT ||
        'pretty') as BrowserLoggerConfig['format'],
      level: (config?.level ||
        process.env.NEXT_PUBLIC_LOG_LEVEL ||
        'info') as LogLevel,
      namespaces:
        config?.namespaces || process.env.NEXT_PUBLIC_LOG_NAMESPACES || '',
    }

    this.parseNamespaces()
  }

  child(namespace: string): BrowserLoggerService {
    const childLogger = Object.create(this)

    childLogger.log = (
      level: LogLevel,
      message: string,
      context?: LogContext,
    ) => {
      this.log(level, message, { ...context, context: namespace })
    }

    return childLogger
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context)
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context)
  }

  fatal(message: string, context?: LogContext): void {
    this.log('fatal', message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context)
  }

  verbose(message: string, context?: LogContext): void {
    this.log('verbose', message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context)
  }

  private config: BrowserLoggerConfig

  private disabledNamespaces: Set<string> = new Set()

  private enabledNamespaces: Set<string> = new Set()

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): unknown {
    const timestamp = new Date().toISOString()
    const namespace = context?.context || 'app'

    if (this.config.format === 'json') {
      const logData: UnknownObjectLike = {
        level,
        message,
        namespace,
        timestamp,
      }

      if (context?.data && this.shouldIncludeData(level)) {
        logData.data = context.data
      }

      const { context: _, data: __, ...otherContext } = context || {}

      Object.assign(logData, otherContext)

      return logData
    }

    const prefix =
      this.config.format === 'compact'
        ? `[${level.toUpperCase()}]`
        : `[${timestamp}] [${level.toUpperCase()}] [${namespace}]`

    const parts = [prefix, message]

    if (context?.data && this.shouldIncludeData(level)) {
      parts.push('data:', JSON.stringify(context.data, null, 2))
    }

    return parts
  }

  private getConsoleMethod(level: LogLevel): (...args: Array<unknown>) => void {
    switch (level) {
      case 'debug':
      case 'verbose':
        return console.debug
      case 'error':
      case 'fatal':
        return console.error
      case 'info':
        return console.info
      case 'warn':
        return console.warn
      default:
        return console.log
    }
  }

  private isLevelEnabled(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level]
  }

  private isNamespaceEnabled(namespace: string): boolean {
    if (
      this.enabledNamespaces.size === 0 &&
      this.disabledNamespaces.size === 0
    ) {
      return false
    }

    for (const pattern of this.disabledNamespaces) {
      if (this.matchesPattern(namespace, pattern)) {
        return false
      }
    }

    for (const pattern of this.enabledNamespaces) {
      if (this.matchesPattern(namespace, pattern)) {
        return true
      }
    }

    return false
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    const namespace = context?.context || 'app'

    if (!this.isNamespaceEnabled(namespace)) {
      return
    }

    if (!this.isLevelEnabled(level)) {
      return
    }

    const formatted = this.formatMessage(level, message, context)
    const consoleMethod = this.getConsoleMethod(level)

    if (this.config.format === 'json') {
      consoleMethod(JSON.stringify(formatted))
    } else {
      consoleMethod(...(Array.isArray(formatted) ? formatted : [formatted]))
    }
  }

  private matchesPattern(namespace: string, pattern: string): boolean {
    if (pattern === '*') {
      return true
    }

    const regexPattern = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*')

    const regex = new RegExp(`^${regexPattern}$`)

    return regex.test(namespace)
  }

  private parseNamespaces(): void {
    if (!this.config.namespaces) {
      return
    }

    const namespaces = this.config.namespaces.split(',').map((ns) => ns.trim())

    for (const namespace of namespaces) {
      if (namespace.startsWith('-')) {
        this.disabledNamespaces.add(namespace.substring(1))
      } else {
        this.enabledNamespaces.add(namespace)
      }
    }
  }

  private shouldIncludeData(level: LogLevel): boolean {
    switch (level) {
      case 'debug':
      case 'verbose':
        return true
      case 'error':
      case 'fatal':
        return true
      case 'info':
      case 'warn':
        return false
      default:
        return false
    }
  }
}

export const browserLogger = new BrowserLoggerService()

export const createBrowserLogger = (
  namespace: string,
): BrowserLoggerService => {
  return browserLogger.child(namespace)
}
