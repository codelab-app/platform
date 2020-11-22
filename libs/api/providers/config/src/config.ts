import { ConfigFactory } from '@nestjs/config/dist/interfaces'
import { environments } from '@codelab/shared/utils'

export enum ApiConfigTypes {
  CODELAB_ENV = 'CODELAB_ENV',

  TYPEORM_SEED = 'TYPEORM_SEED',
  TYPEORM_DROP_SCHEMA = 'TYPEORM_DROP_SCHEMA',
  TYPEORM_SYNCHRONIZE = 'TYPEORM_SYNCHRONIZE',

  // Gateway
  PORT_GATEWAY = 'PORT_GATEWAY',
  API_PORT_GRAPH = 'API_PORT_GRAPH',

  // Postgres
  POSTGRES_HOST = 'POSTGRES_HOST',
  POSTGRES_PORT = 'POSTGRES_PORT',
  POSTGRES_PORT_E2E = 'POSTGRES_PORT_E2E',
  POSTGRES_USER = 'POSTGRES_USER',
  POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
  POSTGRES_DB = 'POSTGRES_DB',

  // Hasura
  HASURA_GRAPHQL_ADMIN_SECRET = 'HASURA_GRAPHQL_ADMIN_SECRET',
  HASURA_GRAPHQL_URI = 'HASURA_GRAPHQL_URI',

  // Auth
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRY = 'JWT_EXPIRY',
  // Google
  GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET = 'GOOGLE_CLIENT_SECRET',
  GOOGLE_CALLBACK_URL = 'GOOGLE_CALLBACK_URL',
  GOOGLE_AUTH_URL = 'GOOGLE_AUTH_URL',
}

export interface ApiConfig {
  [ApiConfigTypes.CODELAB_ENV]: environments | undefined
  [ApiConfigTypes.TYPEORM_SEED]: number
  [ApiConfigTypes.TYPEORM_DROP_SCHEMA]: number
  [ApiConfigTypes.TYPEORM_SYNCHRONIZE]: number
  [ApiConfigTypes.API_PORT_GRAPH]: number | undefined
  [ApiConfigTypes.POSTGRES_HOST]: string | undefined
  [ApiConfigTypes.POSTGRES_PORT]: number | undefined
  [ApiConfigTypes.POSTGRES_PORT_E2E]: number | undefined
  [ApiConfigTypes.POSTGRES_USER]: string | undefined
  [ApiConfigTypes.POSTGRES_PASSWORD]: string | undefined
  [ApiConfigTypes.POSTGRES_DB]: string | undefined
  [ApiConfigTypes.HASURA_GRAPHQL_URI]: string | undefined
  [ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]: string | undefined
  [ApiConfigTypes.JWT_SECRET]: string | undefined
  [ApiConfigTypes.JWT_EXPIRY]: number | undefined
  [ApiConfigTypes.GOOGLE_CLIENT_ID]: string | undefined
  [ApiConfigTypes.GOOGLE_CLIENT_SECRET]: string | undefined
  [ApiConfigTypes.GOOGLE_CALLBACK_URL]: string | undefined
  [ApiConfigTypes.GOOGLE_AUTH_URL]: string | undefined
}

export const config: ConfigFactory<ApiConfig> = () => ({
  [ApiConfigTypes.CODELAB_ENV]: process.env.CODELAB_ENV as environments,
  [ApiConfigTypes.TYPEORM_SEED]: Number(process.env.TYPEORM_SEED),
  [ApiConfigTypes.TYPEORM_DROP_SCHEMA]: Number(process.env.TYPEORM_DROP_SCHEMA),
  [ApiConfigTypes.TYPEORM_SYNCHRONIZE]: Number(process.env.TYPEORM_SYNCHRONIZE),
  [ApiConfigTypes.API_PORT_GRAPH]: Number(process.env.API_PORT_GRAPH),
  [ApiConfigTypes.POSTGRES_HOST]: process.env.POSTGRES_HOST,
  [ApiConfigTypes.POSTGRES_PORT]: Number(process.env.POSTGRES_PORT),
  [ApiConfigTypes.POSTGRES_PORT_E2E]: Number(process.env.POSTGRES_PORT_E2E),
  [ApiConfigTypes.POSTGRES_USER]: process.env.POSTGRES_USER,
  [ApiConfigTypes.POSTGRES_PASSWORD]: process.env.POSTGRES_PASSWORD,
  [ApiConfigTypes.POSTGRES_DB]: process.env.POSTGRES_DB,
  [ApiConfigTypes.HASURA_GRAPHQL_URI]: process.env.HASURA_GRAPHQL_URI,
  [ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]:
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  [ApiConfigTypes.JWT_SECRET]: process.env.JWT_SECRET,
  [ApiConfigTypes.JWT_EXPIRY]: Number(process.env.JWT_EXPIRY),
  [ApiConfigTypes.GOOGLE_CLIENT_ID]: process.env.GOOGLE_CLIENT_ID,
  [ApiConfigTypes.GOOGLE_CLIENT_SECRET]: process.env.GOOGLE_CLIENT_SECRET,
  [ApiConfigTypes.GOOGLE_CALLBACK_URL]: process.env.GOOGLE_CALLBACK_URL,
  [ApiConfigTypes.GOOGLE_AUTH_URL]: process.env.GOOGLE_AUTH_URL,
})
