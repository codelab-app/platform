import { env } from '../env'

export interface INeo4jEnvVars {
  password: string
  uri: string
  user: string
}

export class Neo4jEnvVars implements INeo4jEnvVars {
  get password() {
    return env.get('NEO4J_PASSWORD').required().asString()
  }

  get uri() {
    return env.get('NEO4J_URI').required().asUrlString()
  }

  get user() {
    return env.get('NEO4J_USER').required().asString()
  }
}
