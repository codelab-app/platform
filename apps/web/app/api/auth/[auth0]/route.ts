import 'server-only'
import type { Session } from '@auth0/nextjs-auth0'
import { restApiClient } from '@codelab/frontend-infra-axios'
import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared-infra-auth0/auth0.provider'
import type { NextRequest } from 'next/server'

export const maxDuration = 60

export const GET = auth0Instance.handleAuth({
  callback: auth0Instance.handleCallback({
    afterCallback: async (req: NextRequest, session: Session) => {
      console.log('...auth0.ts', process.env['NODE_ENV'])

      /**
       * Only do this in development
       */
      if (process.env['NODE_ENV'] === 'development') {
        /**
         * Cannot call frontend proxy here, since session is not created yet
         */
        await restApiClient.post(
          'admin/setup-dev',
          {},
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'X-ID-TOKEN': session.idToken,
            },
          },
        )

        return session
      }

      /**
       * Create user in our neo4j database
       */
      if (process.env['NEXT_PUBLIC_WEB_HOST']?.includes('codelab.app')) {
        console.log('Using restApiClient', restApiClient.getUri())

        await restApiClient.post(
          'user/save',
          {},
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'X-ID-TOKEN': session.idToken,
            },
          },
        )
      }

      return session
    },
  }),
  login: auth0Instance.handleLogin({
    returnTo: new URL('/apps', getEnv().auth0.baseUrl).toString(),
  }),
  logout: auth0Instance.handleLogout(() => {
    return {
      returnTo: new URL('/', getEnv().auth0.baseUrl).toString(),
    }
  }),
})
