import * as env from 'env-var'

interface Config {
  neo4j: {
    password: string
    uri: string
    user: string
  }
  auth0: {
    issuer_base_url: string
  }
}

export const Config: Config = {
  neo4j: {
    password: env.get('NEO4J_PASSWORD').required().asString(),
    uri: env.get('NEO4J_URI').required().asString(),
    user: env.get('NEO4J_USER').required().asString(),
  },
  auth0: {
    issuer_base_url: env.get('AUTH0_ISSUER_BASE_URL').required().asString(),
  },
}
