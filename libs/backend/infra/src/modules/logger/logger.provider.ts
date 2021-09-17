import { FactoryProvider } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston'
import { LoggerTokens } from './config/logger.tokens'

export type LoggerService = WinstonLogger &
  Required<Pick<WinstonLogger, 'debug' | 'verbose'>>

export const loggerProvider: FactoryProvider = {
  provide: LoggerTokens.LoggerProvider,
  inject: [WINSTON_MODULE_NEST_PROVIDER],
  useFactory: (logger: WinstonLogger) => {
    return logger
  },
}
