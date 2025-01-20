import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ILoggerService, LogOptions } from '@codelab/shared/infra/logging'
import type { ConfigType } from '@nestjs/config'

import { Inject, Injectable } from '@nestjs/common'
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'
import pino from 'pino'

import { loggerConfig } from '../logger.config'

/**
 * So Nest.js only has two parameters, the first one being the message and the last one being the context. Any other parameters in the middle are ignored.
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

  /**
   * We create a 2 parameter log function, but extract the context as last parameter, while combining the data with first parameter
   */
  override log(message: string, options?: LogOptions): void {
    const context = options?.context ?? ''
    const includeDataForContext = this.config.context.includes(context)

    if (includeDataForContext) {
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
