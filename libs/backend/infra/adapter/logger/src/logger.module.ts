import type { ConfigType } from '@nestjs/config'

import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { omit } from 'remeda'

import { levelMapping, loggerConfig } from './logger.config'
import { NestjsLoggerService } from './nestjs.logger.service'
import { pinoPrettyStream } from './pino/pino-transport'
import { PinoLoggerService } from './pino/pino.logger.service'

@Global()
@Module({
  exports: [PinoLoggerService, NestjsLoggerService],
  imports: [
    ConfigModule.forFeature(loggerConfig),
    LoggerModule.forRootAsync({
      imports: [ConfigModule.forFeature(loggerConfig)],
      inject: [loggerConfig.KEY],
      useFactory: async (config: ConfigType<typeof loggerConfig>) => {
        return {
          pinoHttp: {
            // Disable HTTP requests logging
            autoLogging: false,
            customLevels: levelMapping.values,

            // Force synchronous logging at the transport level
            // customLogLevel: (req, res, err) => {
            //   // Return default level if no specific conditions are met
            //   return 'verbose'
            // },
            // Turn off using `API_LOG_LEVEL`
            enabled: true,

            // Doesn't prefix in front of date
            // msgPrefix: '[API]',
            // Set Pino to synchronous mode
            // formatters: {
            //   bindings: (bindings) => {
            //     return {
            //       ...bindings,
            //       pid: bindings['pid'],
            //     }
            //   },
            // },
            level: config.level,

            mixin: (context) => {
              return context
            },

            serializers: {
              /**
               * Request object is automatically added to the log by nestjs-pino
               */
              req: (req) => {
                // Use omit instead of pick so we know what keys are being removed
                return omit(req, [
                  'id',
                  'headers',
                  'remoteAddress',
                  'remotePort',
                ])
              },
              // res: (res) => {
              //   return {
              //     // Log only specific properties of the response, or return an empty object to exclude all
              //     statusCode: res.statusCode,
              //   }
              // },
            },

            /**
             * You are using both a transport and a destination. You can't have a both (we should probably throw) the transport logic is inherently asynchronous, as it ran off thread. If you want synchronous pretty printing, you should just use it as a stream.
             */
            stream: pinoPrettyStream,
            // transport: {
            //   options: prettyOptions,
            //   target: 'pino-pretty',
            // },
          },
        }
      },
    }),
  ],
  providers: [PinoLoggerService, NestjsLoggerService],
})
export class CodelabLoggerModule {}
