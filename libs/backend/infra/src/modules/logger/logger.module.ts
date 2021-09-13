import { Global, Module } from '@nestjs/common'
// import * as logger from 'fluent-logger'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { LoggerTokens } from './config/logger.tokens'
import { consoleFormat } from './format/console-format'
import { fileFormat } from './format/file-format'
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
            // format.label({ label: path.basename(process.mainModule.filename) }),
            // winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            // // Format the metadata object
            // winston.format.metadata({
            //   fillExcept: ['message', 'level', 'timestamp', 'label'],
            // }),
            // winston.format.json({ space: 2 }),
            // winston.format.prettyPrint({ depth: 4, colorize: true }),
            winston.format.timestamp(),
            winston.format.ms(),
            // utilities.format.nestLike(),
          ),
          transports: [
            // new FluentTransport('codelab', fluentConfig),
            new winston.transports.File({
              filename: 'info.log',
              level: 'info',
              format: winston.format.combine(fileFormat()),
            }),
            new winston.transports.Console({
              format: winston.format.combine(consoleFormat()),
            }),
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
