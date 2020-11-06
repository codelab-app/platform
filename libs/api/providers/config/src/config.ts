export enum ApiConfigTypes {
  // Infrastructure
  MONGO_ENDPOINT,
  // Gateway
  PORT_GATEWAY,
  // Services port
  FEDERATION_PROPS_PORT,
  FEDERATION_USER_PORT,
  FEDERATION_NODE_PORT,
  // Neo4j
  NEO4J_URL,
  NEO4J_USER,
  NEO4J_PASS,
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
  [ApiConfigTypes.NEO4J_URL]: string
  [ApiConfigTypes.NEO4J_USER]: string
  [ApiConfigTypes.NEO4J_PASS]: string
}

export const config = () => ({
  [ApiConfigTypes.MONGO_ENDPOINT]: process.env.MONGO_ENDPOINT,
  [ApiConfigTypes.PORT_GATEWAY]: process.env.API_PORT_GATEWAY,
  [ApiConfigTypes.FEDERATION_PROPS_PORT]: process.env.API_PORT_FEDERATION_PROPS,
  [ApiConfigTypes.FEDERATION_USER_PORT]: process.env.API_PORT_FEDERATION_USER,
  [ApiConfigTypes.FEDERATION_NODE_PORT]: process.env.API_PORT_FEDERATION_NODE,
  [ApiConfigTypes.NEO4J_URL]: process.env.NEO4J_URL,
  [ApiConfigTypes.NEO4J_USER]: process.env.NEO4J_USERNAME,
  [ApiConfigTypes.NEO4J_PASS]: process.env.NEO4J_PASSWORD,
})
