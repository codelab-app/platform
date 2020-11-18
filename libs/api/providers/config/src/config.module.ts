import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { config } from './config'
import {
  ConfigGraphqlHasuraService,
  ConfigTypeormHasuraService,
} from './hasura'
import { ConfigJwtService } from './jwt'
import { envPath, isDev } from '@codelab/shared/utils'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      /**
       * Only load locally
       */
      envFilePath: isDev ? envPath() : '',
      ignoreEnvFile: !isDev,
      validationSchema: Joi.object({
        // CODELAB_ENV: Joi.string().required(),
        // TYPEORM_SEED: Joi.string().required().valid('true', 'false'),
        // // Ports
        // API_PORT_GATEWAY: Joi.string().required(),
        // // Postgres DB
        // POSTGRES_HOST: Joi.string().required(),
        // POSTGRES_PORT: Joi.number().required(),
        // POSTGRES_USER: Joi.string().required(),
        // POSTGRES_PASSWORD: Joi.string().required(),
        // POSTGRES_DB: Joi.string().required(),
        // // Hasura
        // HASURA_GRAPHQL_ADMIN_SECRET: Joi.string().required(),
        // HASURA_GRAPHQL_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [
    ConfigTypeormHasuraService,
    ConfigGraphqlHasuraService,
    ConfigJwtService,
  ],
  exports: [
    ConfigTypeormHasuraService,
    ConfigGraphqlHasuraService,
    ConfigJwtService,
  ],
})
export class ConfigModule {}
