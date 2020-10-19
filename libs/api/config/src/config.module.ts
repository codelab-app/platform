import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import findConfig from 'findup-sync'
import { config } from './config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: findConfig('.env') ?? '',
      validationSchema: Joi.object({
        // Ports
        API_PORT_GATEWAY: Joi.string().required(),
        API_PORT_SERVICES_PROPS: Joi.string().required(),
        API_PORT_SERVICES_USER: Joi.string().required(),
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
