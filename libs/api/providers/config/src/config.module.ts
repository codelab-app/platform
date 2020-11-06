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
        // Ports
        API_PORT_GATEWAY: Joi.string().required(),
        API_PORT_FEDERATION_PROPS: Joi.string().required(),
        API_PORT_FEDERATION_USER: Joi.string().required(),
        API_PORT_FEDERATION_NODE: Joi.string().required(),
        // Mongo
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
