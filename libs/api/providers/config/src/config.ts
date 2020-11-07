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
  DB_NAME,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB,

  // Hasura
  GQL_ENGINE_URI,
  GQL_ENGINE_ACCESS_KEY,
  // Services name
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
  [ApiConfigTypes.DB_NAME]: string
  [ApiConfigTypes.DB_TYPE]: string
  [ApiConfigTypes.DB_HOST]: string
  [ApiConfigTypes.DB_PORT]: number
  [ApiConfigTypes.DB_USERNAME]: string
  [ApiConfigTypes.DB_PASSWORD]: string
  [ApiConfigTypes.DB]: string
  [ApiConfigTypes.GQL_ENGINE_URI]: string
  [ApiConfigTypes.GQL_ENGINE_ACCESS_KEY]: string
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
  [ApiConfigTypes.DB_NAME]: process.env.DB_NAME,
  [ApiConfigTypes.DB_TYPE]: process.env.DB_TYPE,
  [ApiConfigTypes.DB_HOST]: process.env.DB_HOST,
  [ApiConfigTypes.DB_PORT]: process.env.DB_PORT,
  [ApiConfigTypes.DB_USERNAME]: process.env.DB_USERNAME,
  [ApiConfigTypes.DB_PASSWORD]: process.env.DB_PASSWORD,
  [ApiConfigTypes.DB]: process.env.DB,
  [ApiConfigTypes.GQL_ENGINE_URI]: process.env.GQL_ENGINE_URI,
  [ApiConfigTypes.GQL_ENGINE_ACCESS_KEY]: process.env.GQL_ENGINE_ACCESS_KEY,
})
