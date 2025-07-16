import type { UnknownObjectLike } from '@codelab/shared/abstract/types'

import {
  isLevelEnabled,
  isNamespaceEnabled as checkNamespaceEnabled,
  LOG_LEVELS,
  parseNamespaceConfig,
  shouldIncludeData,
  type LogContext,
  type LoggerConfig,
  type LogLevel,
} from '@codelab/shared-infra-logger'

/**
 * Browser-compatible logger service that mirrors the backend Pino logger's
 * namespace filtering and level control functionality.
 */

export type BrowserLoggerConfig = LoggerConfig

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
        config?.namespaces || process.env.NEXT_PUBLIC_DEBUG || '',
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
    return isLevelEnabled(level, this.config.level)
  }

  private isNamespaceEnabled(namespace: string): boolean {
    if (
      this.enabledNamespaces.size === 0 &&
      this.disabledNamespaces.size === 0
    ) {
      return false
    }

    // Convert Set to Array for the shared function
    const patterns = [
      ...Array.from(this.enabledNamespaces),
      ...Array.from(this.disabledNamespaces).map(ns => `-${ns}`),
    ]

    return checkNamespaceEnabled(namespace, patterns)
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


  private parseNamespaces(): void {
    const { enabled, disabled } = parseNamespaceConfig(this.config.namespaces)
    this.enabledNamespaces = enabled
    this.disabledNamespaces = disabled
  }

  private shouldIncludeData(level: LogLevel): boolean {
    return shouldIncludeData(level)
  }
}

export const browserLogger = new BrowserLoggerService()

export const createBrowserLogger = (
  namespace: string,
): BrowserLoggerService => {
  return browserLogger.child(namespace)
}
