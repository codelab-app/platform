import type { ConfigType } from '@nestjs/config'

import { pinoPrettyStream } from '@codelab/shared/infra/logging'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { omit } from 'remeda'

import { loggerConfig } from './logger.config'
import { NestjsLoggerService } from './nestjs.logger.service'
import { CodelabLoggerService } from './pino.logger.service'

@Global()
@Module({
  exports: [CodelabLoggerService, NestjsLoggerService],
  imports: [
    LoggerModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvVars: true,
          load: [loggerConfig],
        }),
      ],
      inject: [loggerConfig.KEY],
      useFactory: async (config: ConfigType<typeof loggerConfig>) => {
        return {
          pinoHttp: {
            // Disable HTTP requests logging
            autoLogging: false,
            // Turn of using `API_LOG_LEVEL`
            enabled: true,
            level: config.level,
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
            // msgPrefix: '[API]',
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
        }
      },
    }),
  ],
  providers: [CodelabLoggerService, NestjsLoggerService],
})
export class CodelabLoggerModule {}
