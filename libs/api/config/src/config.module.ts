import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { config } from './config'
import { envConfig } from '@codelab/shared/utils'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: envConfig ?? '',
      validationSchema: Joi.object({
        API_PORT: Joi.string().required(),
        MONGO_ENDPOINT: Joi.string().required(),
        // Neo4j
        NEO4J_URL: Joi.string().required(),
        NEO4J_USERNAME: Joi.string().required(),
        NEO4J_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigModule {}
