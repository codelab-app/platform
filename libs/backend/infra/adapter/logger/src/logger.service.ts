import type { LoggerService as NestjsLoggerService } from '@nestjs/common'
import { ConsoleLogger, Inject } from '@nestjs/common'
import { Logger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'

export class CodelabLoggerService
  extends Logger
  implements NestjsLoggerService {
  // private readonly logger = new Logger(MyService.name)
  // constructor(
  //   logger: PinoLogger,
  //   @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
  // ) {
  //   super(logger, {
  //     ...params,
  //   })
  // }
}
