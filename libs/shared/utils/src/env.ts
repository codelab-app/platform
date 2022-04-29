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
    client_id: string
    client_secret: string
    cypress_username: string
    cypress_password: string
    audience: string
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
    // TODO: Need to move this to a lib where only test/backend code calls
    secret: env.get('AUTH0_SECRET').required().asString(),
    client_id: env.get('AUTH0_CLIENT_ID').required().asString(),
    client_secret: env.get('AUTH0_CLIENT_SECRET').required().asString(),
    cypress_username: env.get('AUTH0_CYPRESS_USERNAME').required().asString(),
    cypress_password: env.get('AUTH0_CYPRESS_PASSWORD').required().asString(),
    audience: env.get('AUTH0_AUDIENCE').required().asUrlObject().href,
  },
})
