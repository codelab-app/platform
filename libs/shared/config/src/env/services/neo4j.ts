import * as env from 'env-var'

export interface INeo4jEnvVars {
  password: string
  uri: string
  user: string
}

export class Neo4jEnvVars implements INeo4jEnvVars {
  readonly password: string

  readonly uri: string

  readonly user: string

  constructor() {
    this.password = env.get('NEO4J_PASSWORD').required().asString()
    this.uri = env.get('NEO4J_URI').required().asUrlString()
    this.user = env.get('NEO4J_USER').required().asString()
  }
}
