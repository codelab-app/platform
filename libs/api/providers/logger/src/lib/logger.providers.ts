import { FactoryProvider } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston'

export const CODELAB_LOGGER_PROVIDER = 'CODELAB_LOGGER_PROVIDER'

export type CodelabLogger = WinstonLogger

export const codelabLoggerProvider: FactoryProvider = {
  provide: CODELAB_LOGGER_PROVIDER,
  inject: [WINSTON_MODULE_NEST_PROVIDER],
  useFactory: (logger: WinstonLogger) => {
    return logger
  },
}
