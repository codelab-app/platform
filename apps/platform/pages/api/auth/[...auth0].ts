import { restPlatformApiClient } from '@codelab/frontend/application/axios'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

console.log(process.env)

export default auth0Instance().handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await auth0Instance().handleCallback(req, res, {
        afterCallback: async (_req, _res, session, state) => {
          const user = session.user as Auth0IdToken

          if (!session.accessToken) {
            throw new Error('Missing access token')
          }

          if (window.Cypress) {
            await restPlatformApiClient.post('admin/setup-e2e', user, {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                'X-ID-TOKEN': session.idToken,
              },
            })

            return session
          }

          /**
           * Cannot call frontend proxy here, since it would end the current call
           */
          await restPlatformApiClient.post('admin/setup-dev', user, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'X-ID-TOKEN': session.idToken,
            },
          })

          return session
        },
      })
    } catch (error) {
      // console.error(error)
    }
  },
})
