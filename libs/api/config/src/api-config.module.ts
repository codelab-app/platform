import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as findConfig from 'findup-sync'
import configuration from './configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: findConfig('.env.dev') ?? '',
      validationSchema: Joi.object({
        MONGO_ENDPOINT: Joi.string().required(),
        MONGO_ENDPOINT_DEMO: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiConfigModule {}
