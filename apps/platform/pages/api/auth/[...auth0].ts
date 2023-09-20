import {
  getSession,
  handleAuth,
  handleCallback,
  handleLogin,
} from '@auth0/nextjs-auth0'
import { authMiddleware } from '@codelab/backend/infra/adapter/graphql'
import {
  restPlatformApiClient,
  restPlatformClient,
} from '@codelab/frontend/config'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'

export default handleAuth({
  callback: async (req, res) => {
    try {
      await handleCallback(req, res, {
        afterCallback: async (_req, _res, session, state) => {
          const user = session.user as Auth0IdToken

          if (!session.accessToken) {
            throw new Error('Missing access token')
          }

          /**
           * Cannot call frontend proxy here, since it would end the current call
           */
          await restPlatformApiClient.post('user/setup-dev', user, {
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
