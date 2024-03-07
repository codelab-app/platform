import type { LoggerService } from '@nestjs/common'
import { Inject, Injectable } from '@nestjs/common'
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'
import type { PinoMessage } from './pino-transport'

@Injectable()
export class CodelabLoggerService extends Logger implements LoggerService {
  constructor(
    protected override logger: PinoLogger,
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
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
  override log(object: object | undefined = {}, context?: string): void {
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
}
