import { Global, Module } from '@nestjs/common'
// import * as logger from 'fluent-logger'
import { utilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { LoggerTokens } from './config/logger.tokens'
import { loggerProvider } from './logger.provider'

// const FluentTransport = logger.support.winstonTransport()

// const fluentConfig = {
//   host: 'localhost',
//   port: 24224,
//   timeout: 3.0,
//   reconnectInterval: 600000, // 10 minutes
// }

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
            // new FluentTransport('codelab', fluentConfig),
            new winston.transports.Console(),
          ],
        }
      },
    }),
  ],
  controllers: [],
  providers: [loggerProvider],
  exports: [LoggerTokens.LoggerProvider],
})
export class LoggerModule {}
