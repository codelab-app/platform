/* eslint-disable @typescript-eslint/member-ordering */
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ILoggerService, LogOptions } from '@codelab/shared/infra/logging'
import type { ConfigType } from '@nestjs/config'

import { Inject, Injectable, LogLevel } from '@nestjs/common'
import {
  InjectPinoLogger,
  Logger,
  Params,
  PARAMS_PROVIDER_TOKEN,
  PinoLogger,
} from 'nestjs-pino'
import pino from 'pino'
import { omit } from 'remeda'

import { labelMapping, loggerConfig } from '../logger.config'

/**
 * Don't use super, but rather from `logger`
 */
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
    level: LogLevel = 'debug',
  ): Promise<T> {
    const startTime = Date.now()
    const result = await fn()
    const durationSecs = ((Date.now() - startTime) / 1000).toFixed(2)
    const context = options?.context ?? undefined
    const data = options?.data ?? {}

    // Pass data and context as separate properties in LogOptions
    this[level](message, {
      context,
      data: {
        ...data,
      },
      durationSecs,
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

  private shouldIncludeData(options?: LogOptions) {
    const context = options?.context ?? ''

    return this.config.enableDataForContext.some((pattern) => {
      return new RegExp(pattern).test(context)
    })
  }

  private logWithOptions(
    level: LogLevel,
    message: string,
    options: LogOptions = {},
  ): void {
    const mappedLevel = labelMapping[level]
    const logger = this.logger[mappedLevel].bind(this.logger)

    // Always include data for error and fatal levels
    if (
      level === 'error' ||
      level === 'fatal' ||
      this.shouldIncludeData(options)
    ) {
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
