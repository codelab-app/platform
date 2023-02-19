import { isVercelPreview } from '@codelab/shared/config'
import * as env from 'env-var'

/**
 * This can't be imported by Vercel due to edge middleware
 */

interface EnvBuilder {
  neo4j: {
    uri: string
    user: string
    password: string
  }
  auth0: {
    issuer_base_url: string
    /**
     * This is required for `initAuth0`, it loads it behind the scenes
     */
    // audience: string
    secret: string
    client_id: string
    client_secret: string
    cypress_username?: string
    // cypress_password?: string
    base_url: string
  }
  next: {
    enableAPILogging?: boolean
  }
}

export const EnvBuilder = (): EnvBuilder => {
  const auth0baseUrl = isVercelPreview
    ? env.get('VERCEL_URL').required().asString()
    : env.get('NEXT_PUBLIC_BUILDER_HOST').required().asString()

  const isDev = auth0baseUrl.startsWith('127.0.0.1')
  const protocol = isDev ? 'http' : 'https'
  const base_url = `${protocol}://${auth0baseUrl}`

  return {
    neo4j: {
      uri: env.get('NEO4J_URI').required().asString(),
      user: env.get('NEO4J_USER').required().asString(),
      password: env.get('NEO4J_PASSWORD').required().asString(),
    },
    auth0: {
      issuer_base_url: env.get('AUTH0_ISSUER_BASE_URL').required().asString(),
      // audience: env.get('AUTH0_AUDIENCE').required().asString(),
      secret: env.get('AUTH0_SECRET').required().asString(),
      client_id: env.get('AUTH0_CLIENT_ID').required().asString(),
      client_secret: env.get('AUTH0_CLIENT_SECRET').required().asString(),
      cypress_username: env.get('AUTH0_CYPRESS_USERNAME').asString(),
      // cypress_password: env.get('AUTH0_CYPRESS_PASSWORD').asString(),
      /**
       * https://github.com/auth0/nextjs-auth0/issues/383
       *
       * `isVercel` is runtime
       * `isVercelPreview` is build-time
       */
      base_url,
    },
    next: {
      enableAPILogging: env.get('NEXT_API_ENABLE_LOGGING').asBool(),
    },
  }
}
