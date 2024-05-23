import { restApiClient } from '@codelab/frontend/application/axios'
import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared-infra-auth0/auth0.provider'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  maxDuration: 60,
}

export default auth0Instance.handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await auth0Instance.handleCallback(req, res, {
        afterCallback: async (_req, _res, session, state) => {
          if (!session.accessToken) {
            throw new Error('Missing access token')
          }

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
           * Create user in our neo4j database on live site
           */
          if (process.env['NEXT_PUBLIC_WEB_HOST']?.includes('codelab.app')) {
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
      })
    } catch (error) {
      console.error(error)
    }
  },
  login: auth0Instance.handleLogin({
    returnTo: new URL('/apps', getEnv().auth0.baseUrl).toString(),
  }),
})
