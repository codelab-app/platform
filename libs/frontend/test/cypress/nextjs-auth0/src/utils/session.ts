import type { Session } from '@auth0/nextjs-auth0'
import { SessionCache } from '@auth0/nextjs-auth0'
import type { TokenEndpointResponse } from '@auth0/nextjs-auth0/dist/auth0-session'
import { StatelessSession } from '@auth0/nextjs-auth0/dist/auth0-session'
import { getConfig } from '@auth0/nextjs-auth0/dist/config'

const { baseConfig, nextConfig } = getConfig()
const cookieStore = new StatelessSession<Session>(baseConfig)

export const sessionCache = new SessionCache(baseConfig, cookieStore)

/**
 * https://community.auth0.com/t/how-to-create-auth0-session-cookie-programatically-within-ssr-next-js-using-nextjs-auth0/89899/3
 */
export const sessionFromToken = (token: TokenEndpointResponse) => {
  const session = sessionCache.fromTokenEndpointResponse(token)

  return session
}
