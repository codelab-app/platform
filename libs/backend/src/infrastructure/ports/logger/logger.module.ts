import { DynamicModule, Global, Logger, Module, Provider } from '@nestjs/common'
import { prefixesForLoggers } from './logger.decorator'

const loggerFactory = (logger: Logger, prefix?: string) => {
  if (prefix) {
    logger.setContext(prefix)
  }

  return logger
}

const createLoggerProvider = (prefix: string): Provider<Logger> => {
  return {
    provide: `LoggerService${prefix}`,
    useFactory: (logger) => loggerFactory(logger, prefix),
    inject: [Logger],
  }
}

const createLoggerProviders = () => {
  return prefixesForLoggers.map((prefix) => createLoggerProvider(prefix))
}

const loggerProviders = createLoggerProviders()

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerModule,
      providers: [Logger, ...loggerProviders],
      exports: [Logger, ...loggerProviders],
    }
  }
}
