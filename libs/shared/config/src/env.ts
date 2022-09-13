import * as env from 'env-var'

export const isServer = typeof window === 'undefined'

interface Config {
  api: {
    origin: string
  }
  neo4j: {
    uri: string
    user: string
    password: string
  }
  dev: {
    // Should we enable upsert user middleware for next.js
    upsert_user_middleware: boolean
  }
  auth0: {
    issuer_base_url: string
    secret: string
    client_id: string
    client_secret: string
    cypress_username?: string
    cypress_password?: string
    audience: string
    baseUrl: string
  }
}

export const Config = (): Config => ({
  api: {
    origin:
      env.get('NEXT_PUBLIC_API_ORIGIN').asString() ||
      `https://${env.get('VERCEL_URL').asString()}`,
  },
  neo4j: {
    uri: env.get('NEO4J_URI').required().asString(),
    user: env.get('NEO4J_USER').required().asString(),
    password: env.get('NEO4J_PASSWORD').required().asString(),
  },
  dev: {
    upsert_user_middleware: env
      .get('DEV_UPSERT_USER_MIDDLEWARE')
      .default('false')
      .asBoolStrict(),
  },
  auth0: {
    issuer_base_url: env.get('AUTH0_ISSUER_BASE_URL').required().asString(),
    // TODO: Need to move this to a lib where only test/backend code calls
    secret: env.get('AUTH0_SECRET').required().asString(),
    client_id: env.get('AUTH0_CLIENT_ID').required().asString(),
    client_secret: env.get('AUTH0_CLIENT_SECRET').required().asString(),
    cypress_username: env.get('AUTH0_CYPRESS_USERNAME').asString(),
    cypress_password: env.get('AUTH0_CYPRESS_PASSWORD').asString(),
    audience: env.get('AUTH0_AUDIENCE').required().asUrlObject().href,
    baseUrl: String(
      env.get('AUTH0_BASE_URL').asString() ||
        `https://${env.get('VERCEL_URL').asString()}`,
    ),
  },
})
