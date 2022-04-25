import * as env from 'env-var'

export const isServer = typeof window === 'undefined'

interface Config {
  neo4j: {
    uri: string
    user: string
    password: string
  }
  auth0: {
    issuer_base_url: string
    secret: string
  }
}

export const Config = (): Config => ({
  neo4j: {
    uri: env.get('NEO4J_URI').required().asString(),
    user: env.get('NEO4J_USER').required().asString(),
    password: env.get('NEO4J_PASSWORD').required().asString(),
  },
  auth0: {
    issuer_base_url: env.get('AUTH0_ISSUER_BASE_URL').required().asString(),
    secret: env.get('AUTH0_SECRET').required().asString(),
  },
})
