import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { config } from './config'
import {
  ConfigGraphqlHasuraService,
  ConfigTypeormHasuraService,
} from './hasura'
import { envPath } from '@codelab/shared/utils'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: envPath(),
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
        // Postgres DB
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        // Hasura
        HASURA_GRAPHQL_ADMIN_SECRET: Joi.string().required(),
        HASURA_GRAPHQL_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigTypeormHasuraService, ConfigGraphqlHasuraService],
  exports: [ConfigTypeormHasuraService, ConfigGraphqlHasuraService],
})
export class ConfigModule {}
