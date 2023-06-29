import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const neo4jConfig = registerAs('neo4j', () => ({
  password: env.get('NEO4J_PASSWORD').required().asString(),
  uri: env.get('NEO4J_URI').required().asUrlObject(),
  user: env.get('NEO4J_USER').required().asString(),
}))
