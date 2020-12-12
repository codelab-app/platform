import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import findConfig from 'findup-sync'
import { ApiConfig, ApiConfigTypes, config } from './config'
import {
  ConfigGraphqlHasuraService,
  ConfigTypeormHasuraService,
} from './hasura'
import { ConfigJwtService } from './jwt'

const isDev = process.env.NODE_ENV === 'development'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      /**
       * Only load locally
       */
      envFilePath: isDev ? findConfig('.env') ?? '' : '',
      ignoreEnvFile: !isDev,
      validationSchema: Joi.object<ApiConfig>({
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
