/* eslint-disable @typescript-eslint/member-ordering */
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ILoggerService, LogOptions } from '@codelab/shared/infra/logging'
import type { ConfigType } from '@nestjs/config'

import { Inject, Injectable, LogLevel } from '@nestjs/common'
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'
import pino from 'pino'

import { loggerConfig } from '../logger.config'

@Injectable()
export class PinoLoggerService extends Logger implements ILoggerService {
  constructor(
    protected override logger: PinoLogger,
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
    @Inject(loggerConfig.KEY)
    private readonly config: ConfigType<typeof loggerConfig>,
  ) {
    super(logger, {
      ...params,
    })
  }

  private async executeWithTiming<T>(
    message: string,
    fn: () => Promise<T>,
    options?: LogOptions,
    logMethod: LogLevel = 'debug',
  ): Promise<T> {
    const startTime = Date.now()
    const result = await fn()
    const durationSecs = ((Date.now() - startTime) / 1000).toFixed(2)

    this[logMethod](message, {
      ...options,
      data: { ...options?.data, durationSecs },
    })

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
   * Return true by default unless we have a contextFilter with matching level,
   * in which case we check the pattern
   */
  private enableLog(level: LogLevel, options?: LogOptions) {
    const context = options?.context ?? ''

    // Find filters that match the current level
    const matchingLevelFilters = this.config.contextFilter.filter(
      (filter) => level === filter.level,
    )

    // If no filters match the level, enable logging by default
    if (matchingLevelFilters.length === 0) {
      return true
    }

    // If we have matching level filters, check if any pattern matches
    return matchingLevelFilters.some((filter) =>
      new RegExp(filter.pattern).test(context),
    )
  }

  private shouldIncludeData(options?: LogOptions) {
    const context = options?.context ?? ''

    // Check if context matches any enable data patterns
    return this.config.enableDataForContext.some((pattern) => {
      return new RegExp(pattern).test(context)
    })
  }

  private logWithOptions(
    level: LogLevel,
    logFn: (message: string, options?: LogOptions) => void,
    message: string,
    options?: LogOptions,
  ): void {
    const context = options?.context ?? ''

    if (!this.enableLog(level, options)) {
      return
    }

    return logFn.call(this, message, {
      context,
      data: options?.data,
    })
  }

  override log(message: string, options?: LogOptions): void {
    this.logWithOptions('log', super.log, message, options)
  }

  override debug(message: string, options?: LogOptions): void {
    this.logWithOptions('debug', super.debug, message, options)
  }

  override verbose(message: string, options?: LogOptions): void {
    this.logWithOptions('verbose', super.verbose, message, options)
  }

  override warn(message: string, options?: LogOptions): void {
    this.logWithOptions('warn', super.warn, message, options)
  }

  override error(message: string, options?: LogOptions): void {
    this.logWithOptions('error', super.error, message, options)
  }

  override fatal(message: string, options?: LogOptions): void {
    this.logWithOptions('fatal', super.fatal, message, options)
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
