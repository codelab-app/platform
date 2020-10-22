export enum ApiConfigTypes {
  // Infrastructure
  MONGO_ENDPOINT,
  // Gateway
  PORT_GATEWAY,
  // Services port
  SERVICES_PROPS_PORT,
  SERVICES_USER_PORT,
  SERVICES_GRAPH_PORT,
  // Neo4j
  NEO4J_URL,
  NEO4J_USER,
  NEO4J_PASS,
  // Services name
  /**
   * These values aren't loaded from .env file
   */
  SERVICES_PROPS_NAME = 'api.services.props',
  SERVICES_USER_NAME = 'api.services.user',
  SERVICES_GRAPH_NAME = 'api.services.graph',
}

export interface ApiConfig {
  [ApiConfigTypes.MONGO_ENDPOINT]: string
  [ApiConfigTypes.PORT_GATEWAY]: number
  [ApiConfigTypes.SERVICES_PROPS_PORT]: number
  [ApiConfigTypes.SERVICES_USER_PORT]: number
  [ApiConfigTypes.SERVICES_GRAPH_PORT]: number
  [ApiConfigTypes.NEO4J_URL]: string
  [ApiConfigTypes.NEO4J_USER]: string
  [ApiConfigTypes.NEO4J_PASS]: string
}

export const config = () => ({
  [ApiConfigTypes.MONGO_ENDPOINT]: process.env.MONGO_ENDPOINT,
  [ApiConfigTypes.PORT_GATEWAY]: process.env.API_PORT_GATEWAY,
  [ApiConfigTypes.SERVICES_PROPS_PORT]: process.env.API_PORT_SERVICES_PROPS,
  [ApiConfigTypes.SERVICES_USER_PORT]: process.env.API_PORT_SERVICES_USER,
  [ApiConfigTypes.SERVICES_GRAPH_PORT]: process.env.API_PORT_SERVICES_GRAPH,
  [ApiConfigTypes.NEO4J_URL]: process.env.NEO4J_URL,
  [ApiConfigTypes.NEO4J_USER]: process.env.NEO4J_USERNAME,
  [ApiConfigTypes.NEO4J_PASS]: process.env.NEO4J_PASSWORD,
})
