export interface ApiConfig {
  mongoEndpoint: string
  'port.gateway': number
  'port.services.props': number
  'port.services.user': number
  'port.services.graph': number
  'neo4j.url': string
  'neo4j.user': string
  'neo4j.pass': string
}

export const config = () => ({
  mongoEndpoint: process.env.MONGO_ENDPOINT,
  'port.gateway': process.env.API_PORT_GATEWAY,
  'port.services.props': process.env.API_PORT_SERVICES_PROPS,
  'port.services.user': process.env.API_PORT_SERVICES_USER,
  'port.services.graph': process.env.API_PORT_SERVICES_GRAPH,
  'neo4j.url': process.env.NEO4J_URL,
  'neo4j.user': process.env.NEO4J_USERNAME,
  'neo4j.pass': process.env.NEO4J_PASSWORD,
})
