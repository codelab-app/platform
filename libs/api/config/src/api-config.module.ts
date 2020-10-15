import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'
import { envConfig } from '@codelab/shared/utils'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: envConfig ?? '',
      validationSchema: Joi.object({
        API_PORT: Joi.string().required(),
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
