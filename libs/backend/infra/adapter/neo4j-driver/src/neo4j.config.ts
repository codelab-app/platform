import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const neo4jConfig = registerAs('neo4j', () => {
  return {
    password: get('NEO4J_PASSWORD').required().asString(),
    uri: get('NEO4J_URI').required().asUrlObject(),
    user: get('NEO4J_USER').required().asString(),
  }
})
