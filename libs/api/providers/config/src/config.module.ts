import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ApiConfig, ApiConfigTypes, config } from './config'
import { envPath, envs, isDev } from './env'
import {
  ConfigGraphqlHasuraService,
  ConfigTypeormHasuraService,
} from './hasura'
import { ConfigJwtService } from './jwt'

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
      validationSchema: Joi.object<ApiConfig>({
        [ApiConfigTypes.CODELAB_ENV]: Joi.string()
          .required()
          .valid(...envs),
        // Typeorm
        [ApiConfigTypes.TYPEORM_SEED]: Joi.number(),
        [ApiConfigTypes.TYPEORM_DROP_SCHEMA]: Joi.number(),
        [ApiConfigTypes.TYPEORM_SYNCHRONIZE]: Joi.number(),
        // Postgres DB
        [ApiConfigTypes.POSTGRES_HOST]: Joi.string().required(),
        [ApiConfigTypes.POSTGRES_PORT]: Joi.number().required(),
        [ApiConfigTypes.POSTGRES_USER]: Joi.string().required(),
        [ApiConfigTypes.POSTGRES_PASSWORD]: Joi.string().required(),
        [ApiConfigTypes.POSTGRES_DB]: Joi.string().required(),
        // Hasura
        [ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]: Joi.string().required(),
        [ApiConfigTypes.HASURA_GRAPHQL_URI]: Joi.string().required(),
        // JWT
        [ApiConfigTypes.JWT_EXPIRY]: Joi.number().required(),
        [ApiConfigTypes.JWT_SECRET]: Joi.string().required(),
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
