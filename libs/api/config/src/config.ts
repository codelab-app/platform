export interface ApiConfig {
  port: number
  'neo4j.url': string
  'neo4j.user': string
  'neo4j.pass': string
}

export const config = () => ({
  port: process.env.API_PORT,
  'neo4j.url': process.env.NEO4J_URL,
  'neo4j.user': process.env.NEO4J_USERNAME,
  'neo4j.pass': process.env.NEO4J_PASSWORD,
})
