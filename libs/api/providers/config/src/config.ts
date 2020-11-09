import { ConfigFactory } from '@nestjs/config/dist/interfaces'

export enum ApiConfigTypes {
  // Infrastructure
  MONGO_ENDPOINT,

  // Gateway
  PORT_GATEWAY,

  // Services port
  API_PORT_FEDERATION_PROPS,
  FEDERATION_USER_PORT,
  FEDERATION_NODE_PORT,
  API_PORT_GRAPH,

  // Neo4j
  NEO4J_URL,
  NEO4J_USER,
  NEO4J_PASS,

  // Postgres
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,

  // Hasura
  HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_URI,

  /**
   * These values aren't loaded from .env file
   */
  FEDERATION_PROPS_NAME = 'api.federation.props',
  FEDERATION_USER_NAME = 'api.services.user',
  FEDERATION_NODE_NAME = 'api.federation.node',

  GRPC_PROPS_PACKAGE = 'GRPC_PROPS_PACKAGE',
}

export interface ApiConfig {
  [ApiConfigTypes.MONGO_ENDPOINT]: string | undefined
  [ApiConfigTypes.PORT_GATEWAY]: number | undefined
  [ApiConfigTypes.API_PORT_FEDERATION_PROPS]: number | undefined
  [ApiConfigTypes.FEDERATION_USER_PORT]: number | undefined
  [ApiConfigTypes.FEDERATION_NODE_PORT]: number | undefined
  [ApiConfigTypes.API_PORT_GRAPH]: number | undefined
  [ApiConfigTypes.NEO4J_URL]: string | undefined
  [ApiConfigTypes.NEO4J_USER]: string | undefined
  [ApiConfigTypes.NEO4J_PASS]: string | undefined
  [ApiConfigTypes.POSTGRES_HOST]: string | undefined
  [ApiConfigTypes.POSTGRES_PORT]: number | undefined
  [ApiConfigTypes.POSTGRES_USER]: string | undefined
  [ApiConfigTypes.POSTGRES_PASSWORD]: number | undefined
  [ApiConfigTypes.POSTGRES_DB]: string | undefined
  [ApiConfigTypes.HASURA_GRAPHQL_URI]: string | undefined
  [ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]: string | undefined
}

export const config: ConfigFactory<ApiConfig> = () => ({
  [ApiConfigTypes.MONGO_ENDPOINT]: process.env.MONGO_ENDPOINT,
  [ApiConfigTypes.PORT_GATEWAY]: Number(process.env.API_PORT_GATEWAY),
  [ApiConfigTypes.API_PORT_FEDERATION_PROPS]: Number(
    process.env.API_PORT_FEDERATION_PROPS,
  ),
  [ApiConfigTypes.FEDERATION_USER_PORT]: Number(
    process.env.API_PORT_FEDERATION_USER,
  ),
  [ApiConfigTypes.FEDERATION_NODE_PORT]: Number(
    process.env.API_PORT_FEDERATION_NODE,
  ),
  [ApiConfigTypes.API_PORT_GRAPH]: Number(process.env.API_PORT_GRAPH),
  [ApiConfigTypes.NEO4J_URL]: process.env.NEO4J_URL,
  [ApiConfigTypes.NEO4J_USER]: process.env.NEO4J_USERNAME,
  [ApiConfigTypes.NEO4J_PASS]: process.env.NEO4J_PASSWORD,
  [ApiConfigTypes.POSTGRES_HOST]: process.env.POSTGRES_HOST,
  [ApiConfigTypes.POSTGRES_PORT]: Number(process.env.POSTGRES_PORT),
  [ApiConfigTypes.POSTGRES_USER]: process.env.POSTGRES_USER,
  [ApiConfigTypes.POSTGRES_PASSWORD]: Number(process.env.POSTGRES_PASSWORD),
  [ApiConfigTypes.POSTGRES_DB]: process.env.POSTGRES_DB,
  [ApiConfigTypes.HASURA_GRAPHQL_URI]: process.env.HASURA_GRAPHQL_URI,
  [ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]:
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
})
