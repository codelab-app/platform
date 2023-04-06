import { isVercelPreview } from '@codelab/shared/config'
import * as env from 'env-var'

/**
 * This can't be imported by Vercel due to edge middleware
 */

interface EnvBuilder {
  auth0: {
    // cypress_password?: string
    base_url: string
    client_id: string
    client_secret: string
    cypress_username?: string
    issuer_base_url: string
    /**
     * This is required for `initAuth0`, it loads it behind the scenes
     */
    // audience: string
    secret: string
  }
  neo4j: {
    password: string
    uri: string
    user: string
  }
  next: {
    enableAPILogging?: boolean
  }
}

export const EnvBuilder = (): EnvBuilder => {
  const auth0baseUrl = isVercelPreview
    ? env.get('VERCEL_URL').required().asString()
    : env.get('NEXT_PUBLIC_PLATFORM_HOST').required().asString()

  const isDev = auth0baseUrl.startsWith('127.0.0.1')
  const protocol = isDev ? 'http' : 'https'
  const base_url = `${protocol}://${auth0baseUrl}`

  return {
    get auth0() {
      return {
        // cypress_password: env.get('AUTH0_CYPRESS_PASSWORD').asString(),
        /**
         * https://github.com/auth0/nextjs-auth0/issues/383
         *
         * `isVercel` is runtime
         * `isVercelPreview` is build-time
         */
        base_url,

        client_id: env.get('AUTH0_CLIENT_ID').required().asString(),

        client_secret: env.get('AUTH0_CLIENT_SECRET').required().asString(),

        cypress_username: env.get('AUTH0_CYPRESS_USERNAME').asString(),

        issuer_base_url: env.get('AUTH0_ISSUER_BASE_URL').required().asString(),

        // audience: env.get('AUTH0_AUDIENCE').required().asString(),
        secret: env.get('AUTH0_SECRET').required().asString(),
      }
    },
    get neo4j() {
      return {
        password: env.get('NEO4J_PASSWORD').required().asString(),
        uri: env.get('NEO4J_URI').required().asString(),
        user: env.get('NEO4J_USER').required().asString(),
      }
    },
    get next() {
      return {
        enableAPILogging: env.get('NEXT_API_ENABLE_LOGGING').asBool(),
      }
    },
  }
}
