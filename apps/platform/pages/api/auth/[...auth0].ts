import { restPlatformApiClient } from '@codelab/frontend/application/axios'
import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

console.log(process.env)

export default auth0Instance().handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await auth0Instance().handleCallback(req, res, {
        afterCallback: async (_req, _res, session, state) => {
          if (!session.accessToken) {
            throw new Error('Missing access token')
          }

          // Can't find other way to see if we're running in Cypress
          if (process.env['NX_CYPRESS_TARGET_CONFIGURATION']) {
            return session
          }

          /**
           * Cannot call frontend proxy here, since session is not created yet
           */
          await restPlatformApiClient.post(
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
        },
      })
    } catch (error) {
      // console.error(error)
    }
  },
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    await auth0Instance().handleLogin(req, res, {
      returnTo: new URL('/apps', getEnv().auth0.baseUrl).toString(),
    })
  },
})
