import type {
  AbstractSession,
  TokenEndpointResponse,
} from '@auth0/nextjs-auth0/dist/auth0-session'
import { StatelessSession } from '@auth0/nextjs-auth0/dist/auth0-session'
import { getConfig } from '@auth0/nextjs-auth0/dist/config'
import type { Session } from '@auth0/nextjs-auth0/dist/session'
import { SessionCache } from '@auth0/nextjs-auth0/dist/session'
import type * as jose from 'jose'

const setAuth0Session = (tokenSet: TokenEndpointResponse) => {
  const { baseConfig, nextConfig } = getConfig()

  // const cookieStore = new CookieStore(baseConfig)
  // const sessionCache = new SessionCache(baseConfig, cookieStore)
  const sessionStore = new StatelessSession(
    baseConfig,
  ) as AbstractSession<Session>

  const sessionCache = new SessionCache(baseConfig, sessionStore)
  const session = sessionCache.fromTokenEndpointResponse(tokenSet)
  void sessionCache.create(req, res, session)
}
