import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { PinoMessage } from '@codelab/shared/infra/logging'
import type { LoggerService } from '@nestjs/common'

import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'
import pino from 'pino'

import { loggerConfig } from './logger.config'

@Injectable()
export class PinoLoggerService extends Logger implements LoggerService {
  constructor(
    protected override logger: PinoLogger,
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
    @Inject(loggerConfig.KEY)
    private readonly loggerConf: ConfigType<typeof loggerConfig>,
  ) {
    super(logger, {
      ...params,
    })
  }

  /**
   * We follow nestjs param order, which differs from pino param order
   *
   * Watch out for `info()` method override
   */
  override log(object: ObjectLike | undefined = {}, context?: string): void {
    /**
     * We can't use this, since cannot control how the object is colorized before printing
     *
     * We combine everything into an object, then convert to string, then recreate the object in the transport
     */
    // this.logger.info(object, message)
    const pinoMessage: PinoMessage = {
      context,
      object,
    }

    const message = JSON.stringify(pinoMessage)

    this.logger.info(message)
  }

  public logToFile(
    object: ObjectLike | undefined = {},
    filePath = 'tmp/logs/application.log',
  ): void {
    console.log('Logging to file...', filePath)

    const childLogger = pino({
      transport: {
        options: {
          destination: filePath,
          mkdir: true,
        },
        target: 'pino/file',
      },
    })

    const pinoMessage: PinoMessage = {
      context: 'FileLogger',
      object,
    }

    childLogger.info(pinoMessage)
  }
}
