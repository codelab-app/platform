import {
  getSession,
  handleAuth,
  handleCallback,
  handleLogin,
} from '@auth0/nextjs-auth0'
import { restClient } from '@codelab/frontend/config'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'

export default handleAuth({
  callback: async (req, res) => {
    try {
      await handleCallback(req, res, {
        afterCallback: async (_req, _res, session, state) => {
          const user = session.user as Auth0IdToken

          await restClient.post('user/setup', user)

          return session
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
})
