import type { ConfigType } from '@nestjs/config'

import { pinoPrettyStream } from '@codelab/shared/infra/logging'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import pino from 'pino'
import { omit } from 'remeda'

import { loggerConfig } from './logger.config'
import { NestjsLoggerService } from './nestjs.logger.service'
import { PinoLoggerService } from './pino.logger.service'

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
            // Turn off using `API_LOG_LEVEL`
            enabled: true,
            // Doesn't prefix in front of date
            // msgPrefix: '[API]',
            // Set Pino to synchronous mode
            formatters: {
              bindings: (bindings) => {
                return {
                  ...bindings,
                  pid: bindings['pid'],
                }
              },
            },
            level: config.level,
            mixin: (context, level, logger) => {
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
             * https://stackoverflow.com/a/74100511/2159920
             *
             * Enable synchronous logging
             */
            stream: pinoPrettyStream,
          },
        }
      },
    }),
  ],
  providers: [PinoLoggerService, NestjsLoggerService],
})
export class CodelabLoggerModule {}
