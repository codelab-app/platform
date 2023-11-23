import { restPlatformApiClient } from '@codelab/frontend/application/axios'
import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  maxDuration: 60,
  runtime: 'experimental-edge',
}

const instance = auth0Instance()

export default instance.handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('callback')

    try {
      await instance.handleCallback(req, res, {
        afterCallback: async (_req, _res, session, state) => {
          if (!session.accessToken) {
            throw new Error('Missing access token')
          }

          console.log(
            `process.env['NX_CYPRESS_TARGET_CONFIGURATION']`,
            process.env['NX_CYPRESS_TARGET_CONFIGURATION'],
          )

          // Can't find other way to see if we're running in Cypress
          if (process.env['NX_CYPRESS_TARGET_CONFIGURATION']) {
            return session
          }

          console.log(`process.env['NODE_ENV']`, process.env['NODE_ENV'])

          // in production we don't want to seed the database
          // each time any user logs-in
          if (process.env['NODE_ENV'] !== 'development') {
            return session
          }

          console.log('setup-dev')

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
      console.error(error)
    }
  },
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('login')
    await instance.handleLogin(req, res, {
      returnTo: new URL('/apps', getEnv().auth0.baseUrl).toString(),
    })
  },
})
