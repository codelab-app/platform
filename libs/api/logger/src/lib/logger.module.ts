import { Global, Module } from '@nestjs/common'
import * as logger from 'fluent-logger'
import { WinstonModule, utilities } from 'nest-winston'
import * as winston from 'winston'
import {
  CODELAB_LOGGER_PROVIDER,
  codelabLoggerProvider,
} from './logger.providers'

const FluentTransport = logger.support.winstonTransport()

const fluentConfig = {
  host: 'localhost',
  port: 24224,
  timeout: 3.0,
  reconnectInterval: 600000, // 10 minutes
}

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [],
      useFactory: () => {
        return {
          format: winston.format.combine(
            // winston.format.json(),
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
          transports: [
            new FluentTransport('codelab', fluentConfig),
            new winston.transports.Console(),
          ],
        }
      },
    }),
  ],
  controllers: [],
  providers: [codelabLoggerProvider],
  exports: [CODELAB_LOGGER_PROVIDER],
})
export class LoggerModule {}
