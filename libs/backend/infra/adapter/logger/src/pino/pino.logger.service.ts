/* eslint-disable @typescript-eslint/member-ordering */
import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { ILoggerService, LogOptions } from '@codelab/shared-infra-logging'
import type { ConfigType } from '@nestjs/config'

import { Inject, Injectable, LogLevel } from '@nestjs/common'
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'
import pino from 'pino'
import { omit } from 'remeda'

import { labelMapping, loggerConfig } from '../logger.config'
import { isNamespaceEnabled, parseNamespaces } from '../logger.constants'

/**
 * Don't use super, but rather from `logger`
 */
@Injectable()
export class PinoLoggerService extends Logger implements ILoggerService {
  private readonly enabledNamespaces: Array<string>

  private operationCounter = 0

  constructor(
    protected override logger: PinoLogger,
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
    @Inject(loggerConfig.KEY)
    private readonly config: ConfigType<typeof loggerConfig>,
  ) {
    super(logger, {
      ...params,
    })
    this.enabledNamespaces = parseNamespaces(this.config.debug)
  }

  private async executeWithTiming<T>(
    message: string,
    fn: () => Promise<T>,
    options?: LogOptions,
    level: LogLevel = 'debug',
  ): Promise<T> {
    const context = options?.context ?? undefined
    const isEnabled = this.isLoggingEnabled(context)

    // If logging is disabled, just execute the function
    if (!isEnabled) {
      return await fn()
    }

    const startTime = Date.now()
    const result = await fn()
    const endTime = Date.now()
    const durationMs = endTime - startTime
    const durationSecs = (durationMs / 1000).toFixed(2)
    const data = options?.data ?? {}

    // Format start time for display
    const startTimeFormatted = new Date(startTime).toLocaleTimeString('en-US', {
      fractionalSecondDigits: 3,
      hour: 'numeric',
      hour12: true,
      minute: '2-digit',
      second: '2-digit',
    })

    // Pass data and context as separate properties in LogOptions
    this[level](
      `${message} (started at ${startTimeFormatted}, took ${durationSecs}s)`,
      {
        context,
        data: {
          ...data,
        },
        durationSecs,
        timing: {
          completedAt: new Date(endTime).toISOString(),
          durationMs,
          startedAt: new Date(startTime).toISOString(),
        },
      },
    )

    return result
  }

  async debugWithTiming<T>(
    message: string,
    fn: () => Promise<T>,
    options?: LogOptions,
  ): Promise<T> {
    return this.executeWithTiming(message, fn, options, 'debug')
  }

  async verboseWithTiming<T>(
    message: string,
    fn: () => Promise<T>,
    options?: LogOptions,
  ): Promise<T> {
    return this.executeWithTiming(message, fn, options, 'verbose')
  }

  /**
   * Determines if logging is enabled based on context and configured namespaces.
   *
   * Behavior:
   * - If no namespaces are configured (DEBUG env var is empty), all logs without context are shown
   * - If namespaces are configured:
   *   - Logs without context are always shown (no filtering applied)
   *   - Logs with context are filtered based on enabled namespaces
   *
   * This allows decorators like @LogClassMethod that don't pass context to always log,
   * while still filtering logs that explicitly set a context.
   *
   * @param context - Optional context to check against enabled namespaces
   * @returns true if logging should proceed, false if it should be filtered out
   */
  private isLoggingEnabled(context?: string): boolean {
    // If no context provided, always allow logging
    // This ensures decorators like @LogClassMethod work without modification
    if (!context) {
      return true
    }

    // If no namespaces configured, disable all logs with context
    if (!this.enabledNamespaces.length) {
      return false
    }

    // Check if the specific context is enabled
    return isNamespaceEnabled(context, this.enabledNamespaces)
  }

  private shouldIncludeData(level: LogLevel): boolean {
    // Include data for verbose, debug, error, and fatal levels
    return (
      level === 'verbose' ||
      level === 'debug' ||
      level === 'error' ||
      level === 'fatal'
    )
  }

  private logWithOptions(
    level: LogLevel,
    message: string,
    options: LogOptions = {},
  ): void {
    // Check if logging is enabled for this context
    if (!this.isLoggingEnabled(options.context)) {
      return
    }

    const mappedLevel = labelMapping[level]
    const logger = this.logger[mappedLevel].bind(this.logger)

    // Include data based on log level
    if (this.shouldIncludeData(level)) {
      logger({ msg: message, ...options })
    } else {
      logger({
        msg: message,
        ...omit(options, ['data']),
      })
    }
  }

  override log(message: string, options?: LogOptions): void {
    this.logWithOptions('log', message, options)
  }

  /**
   * If we specify 2 params format, the second param will be under `context` no matter what
   *
   * debug('Hello', 'World') -> DEBUG: Hello /n context: "World"
   * debug('Hello', 'World', '!') -> DEBUG: Hello /n context: "!"
   *
   * If we use single object, we have more control
   *
   * debug({ msg: 'Hello', context: 'World', data: '!' }) -> DEBUG
   *
   *
   * @param message
   * @param options
   */
  override debug(message: string, options?: LogOptions): void {
    this.logWithOptions('debug', message, options)
  }

  override verbose(message: string, options?: LogOptions): void {
    this.logWithOptions('verbose', message, options)
  }

  override warn(message: string, options?: LogOptions): void {
    this.logWithOptions('warn', message, options)
  }

  override error(message: string, options?: LogOptions): void {
    this.logWithOptions('error', message, options)
  }

  override fatal(message: string, options?: LogOptions): void {
    this.logWithOptions('fatal', message, options)
  }

  public logToFile(
    object: ObjectLike | undefined = {},
    filePath = 'tmp/logs/application.log',
  ): void {
    this.log('Logging to file...', {
      context: 'FileLogger',
      data: { filePath },
    })

    const childLogger = pino({
      transport: {
        options: {
          destination: filePath,
          mkdir: true,
        },
        target: 'pino/file',
      },
    })

    const pinoMessage = {
      context: 'FileLogger',
      object,
    }

    childLogger.info(pinoMessage)
  }
}
