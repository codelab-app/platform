import {
  FactoryProvider,
  LoggerService as ILoggerService,
} from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston'
import { LoggerTokens } from './config/logger.tokens'

export class LoggerService extends WinstonLogger implements ILoggerService {}

export const loggerProvider: FactoryProvider = {
  provide: LoggerTokens.LoggerProvider,
  inject: [WINSTON_MODULE_NEST_PROVIDER],
  useFactory: (logger: WinstonLogger) => {
    return logger
  },
}
