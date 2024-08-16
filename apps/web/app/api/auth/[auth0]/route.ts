import 'server-only'
import type { Session } from '@auth0/nextjs-auth0'
import { PageType } from '@codelab/frontend/abstract/types'
import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import * as env from 'env-var'
import { type NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

/**
 * https://stackoverflow.com/questions/63776137/getting-a-cors-error-when-trying-to-authenticate-user-with-auth0
 */
export const GET = auth0Instance.handleAuth({
  callback: auth0Instance.handleCallback({
    afterCallback: async (req: NextRequest, session: Session) => {
      console.log('[auth0]/route.ts', process.env['NODE_ENV'])

      /**
       * Only do this in development
       */
      if (env.get('SETUP_DEV_AFTER_AUTH0_LOGIN').asBool()) {
        /**
         * Cannot call fetchWithAuth since session is not created yet
         */
        await fetch(getEnv().endpoint.admin.setupDev, {
          body: JSON.stringify({}),
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'X-ID-TOKEN': session.idToken ?? '',
          },
          method: 'POST',
        })

        return session
      }

      /**
       * Create user in our neo4j database
       */
      if (process.env['NEXT_PUBLIC_WEB_HOST']?.includes('codelab.app')) {
        await fetch(getEnv().endpoint.user.save, {
          body: JSON.stringify({}),
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'X-ID-TOKEN': session.idToken ?? '',
          },
          method: 'POST',
        })
      }

      return session
    },
  }),
  login: auth0Instance.handleLogin({
    returnTo: new URL(PageType.AppList, getEnv().auth0.baseUrl).toString(),
  }),
  logout: auth0Instance.handleLogout(() => {
    return {
      returnTo: new URL('/', getEnv().auth0.baseUrl).toString(),
    }
  }),
})

/**
 * https://github.com/vercel/next.js/discussions/52933
 */
export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse(null, {
    status: 200,
  })
}
