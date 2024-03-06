import { Module } from '@nestjs/common'
import colorizer from '@pinojs/json-colorizer'
import omit from 'lodash/omit'
import { LoggerModule } from 'nestjs-pino'
import path from 'path'
import pino from 'pino'
import { NestjsLoggerService } from './nestjs.logger.service'
import { CodelabLoggerService } from './pino.logger.service'
import { pinoPrettyStream } from './pino-transport'

@Module({
  exports: [CodelabLoggerService, NestjsLoggerService],
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // Disable HTTP requests logging
        autoLogging: false,

        /**
         * https://stackoverflow.com/a/74100511/2159920
         *
         * Enable synchronous logging
         */
        // stream: pino.destination({
        //   sync: true,
        //   // write: (message: string) => {
        //   //   console.log(colorizer(message))
        //   // },
        // }),
        // Doesn't prefix in front of date
        // msgPrefix: '[Platform API]',
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
        stream: pinoPrettyStream,
        // Prettify and colorize log
        // transport:
        //   process.env['NODE_ENV'] !== 'production'
        //     ? {
        //         options: transportOptions,
        //         // target: 'pino-pretty',
        //         target: require.resolve('./pino-transport'),
        //       }
        //     : undefined,
      },
    }),
  ],
  providers: [CodelabLoggerService, NestjsLoggerService],
})
export class CodelabLoggerModule {}
