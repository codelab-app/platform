import { Module } from '@nestjs/common'
import colorizer from '@pinojs/json-colorizer'
import omit from 'lodash/omit'
import { LoggerModule } from 'nestjs-pino'
import pino from 'pino'
import type pretty from 'pino-pretty'
import { CodelabLoggerService } from './logger.service'

/**
 * https://stackoverflow.com/a/71467088/2159920
 */
const transportOptions: pretty.PrettyOptions = {
  colorize: true,
  errorLikeObjectKeys: ['err', 'error'],
  ignore: 'pid,hostname,context,req,res,responseTime',
  // levelFirst: false,
  // messageFormat: '{req.headers.x-correlation-id} [{context}] {msg}',
  // messageFormat: (log, messageKey, levelLabel) => {
  //   const message = log[messageKey]

  //   if (log['requestId']) {
  //     return `[${log['requestId']}] ${message}`
  //   }

  //   return `${message}`
  // },
  singleLine: false,
  sync: true,
  // NestJS-like timestamp
  translateTime: 'SYS:mm/dd/yyyy hh:mm:ss TT',
}

@Module({
  exports: [CodelabLoggerService],
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // Disable HTTP requests logging
        autoLogging: false,
        formatters: {},
        // Set Pino to synchronous mode
        serializers: {
          req: (req) => {
            // Do omission instead of pick as to document the keys
            return omit(req, ['id', 'headers'])
          },
          // res: (res) => {
          //   return {
          //     // Log only specific properties of the response, or return an empty object to exclude all
          //     statusCode: res.statusCode,
          //   }
          // },
        },
        // Enable synchronous logging
        stream: pino.destination({
          sync: true,
          write: (message: string) => {
            console.log(colorizer(message))
          },
        }),
        // Prettify and colorize log
        transport:
          process.env['NODE_ENV'] !== 'production'
            ? {
                options: transportOptions,
                target: 'pino-pretty',
              }
            : undefined,
      },
    }),
  ],
  providers: [CodelabLoggerService],
})
export class CodelabLoggerModule {}
