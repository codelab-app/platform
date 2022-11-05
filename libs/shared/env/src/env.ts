import { isVercel, isVercelPreview } from '@codelab/shared/config'
import * as env from 'env-var'

/**
 * This can't be imported by Vercel due to edge middleware
 */

interface Env {
  neo4j: {
    uri: string
    user: string
    password: string
  }
  builder: {
    host: string
  }
  auth0: {
    issuer_base_url: string
    secret: string
    client_id: string
    client_secret: string
    cypress_username?: string
    cypress_password?: string
    baseUrl: string
  }
}

export const Env = (): Env => ({
  neo4j: {
    uri: env.get('NEO4J_URI').required().asString(),
    user: env.get('NEO4J_USER').required().asString(),
    password: env.get('NEO4J_PASSWORD').required().asString(),
  },
  builder: {
    host: env.get('NEXT_PUBLIC_BUILDER_HOST').required().asString(),
  },
  auth0: {
    issuer_base_url: env.get('AUTH0_ISSUER_BASE_URL').required().asString(),
    // TODO: Need to move this to a lib where only test/backend code calls
    secret: env.get('AUTH0_SECRET').required().asString(),
    client_id: env.get('AUTH0_CLIENT_ID').required().asString(),
    client_secret: env.get('AUTH0_CLIENT_SECRET').required().asString(),
    cypress_username: env.get('AUTH0_CYPRESS_USERNAME').asString(),
    cypress_password: env.get('AUTH0_CYPRESS_PASSWORD').asString(),
    baseUrl:
      /**
       * https://github.com/auth0/nextjs-auth0/issues/383
       *
       * `isVercel` is runtime
       * `isVercelPreview` is build-time
       */
      isVercelPreview
        ? `https://${env.get('VERCEL_URL').required().asString()}`
        : `http://${env.get('NEXT_PUBLIC_BUILDER_HOST').required().asString()}`,
  },
})
