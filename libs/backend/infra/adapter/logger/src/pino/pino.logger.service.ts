import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ILoggerService, LogOptions } from '@codelab/shared/infra/logging'
import type { ConfigType } from '@nestjs/config'

import { Inject, Injectable } from '@nestjs/common'
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

  async debugWithTiming(
    message: string,
    fn: () => Promise<void>,
    options?: LogOptions,
  ) {
    const startTime = Date.now()

    await fn()

    const durationSecs = ((Date.now() - startTime) / 1000).toFixed(2)

    this.debug(message, {
      ...options,
      data: { ...options?.data, durationSecs },
    })
  }

  /**
   * We create a 2 parameter log function, but extract the context as last parameter, while combining the data with first parameter
   */
  override log(message: string, options?: LogOptions): void {
    const context = options?.context ?? ''

    // Check if context matches any disable patterns
    const shouldDisableLog = this.config.disableLogForContext.some(
      (pattern) => {
        return new RegExp(pattern).test(context)
      },
    )

    if (shouldDisableLog) {
      return
    }

    // Check if context matches any enable data patterns
    const shouldIncludeData = this.config.enableDataForContext.some(
      (pattern) => {
        return new RegExp(pattern).test(context)
      },
    )

    if (shouldIncludeData) {
      return super.log(
        {
          data: options?.data,
          message,
        },
        context,
      )
    }

    super.log(
      {
        message,
      },
      context,
    )
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
