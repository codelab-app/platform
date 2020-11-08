export enum ApiConfigTypes {
  // Infrastructure
  MONGO_ENDPOINT,

  // Gateway
  PORT_GATEWAY,

  // Services port
  FEDERATION_PROPS_PORT,
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
  [ApiConfigTypes.MONGO_ENDPOINT]: string
  [ApiConfigTypes.PORT_GATEWAY]: number
  [ApiConfigTypes.FEDERATION_PROPS_PORT]: number
  [ApiConfigTypes.FEDERATION_USER_PORT]: number
  [ApiConfigTypes.FEDERATION_NODE_PORT]: number
  [ApiConfigTypes.API_PORT_GRAPH]: number
  [ApiConfigTypes.NEO4J_URL]: string
  [ApiConfigTypes.NEO4J_USER]: string
  [ApiConfigTypes.NEO4J_PASS]: string
  [ApiConfigTypes.POSTGRES_HOST]: string
  [ApiConfigTypes.POSTGRES_PORT]: number
  [ApiConfigTypes.POSTGRES_USER]: string
  [ApiConfigTypes.POSTGRES_PASSWORD]: number
  [ApiConfigTypes.POSTGRES_DB]: string
  [ApiConfigTypes.HASURA_GRAPHQL_URI]: string
  [ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]: string
}

export const config = () => ({
  [ApiConfigTypes.MONGO_ENDPOINT]: process.env.MONGO_ENDPOINT,
  [ApiConfigTypes.PORT_GATEWAY]: process.env.API_PORT_GATEWAY,
  [ApiConfigTypes.FEDERATION_PROPS_PORT]: process.env.API_PORT_FEDERATION_PROPS,
  [ApiConfigTypes.FEDERATION_USER_PORT]: process.env.API_PORT_FEDERATION_USER,
  [ApiConfigTypes.FEDERATION_NODE_PORT]: process.env.API_PORT_FEDERATION_NODE,
  [ApiConfigTypes.API_PORT_GRAPH]: process.env.API_PORT_GRAPH,
  [ApiConfigTypes.NEO4J_URL]: process.env.NEO4J_URL,
  [ApiConfigTypes.NEO4J_USER]: process.env.NEO4J_USERNAME,
  [ApiConfigTypes.NEO4J_PASS]: process.env.NEO4J_PASSWORD,
  [ApiConfigTypes.POSTGRES_HOST]: process.env.POSTGRES_HOST,
  [ApiConfigTypes.POSTGRES_PORT]: process.env.POSTGRES_PORT,
  [ApiConfigTypes.POSTGRES_USER]: process.env.POSTGRES_USER,
  [ApiConfigTypes.POSTGRES_PASSWORD]: process.env.POSTGRES_PASSWORD,
  [ApiConfigTypes.POSTGRES_DB]: process.env.POSTGRES_DB,
  [ApiConfigTypes.HASURA_GRAPHQL_URI]: process.env.HASURA_GRAPHQL_URI,
  [ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]:
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
})
