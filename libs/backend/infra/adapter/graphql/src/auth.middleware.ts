import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

export const authMiddleware: NextApiHandler = async (req, res) => {
  try {
    /**
     * Requires `headers.cookie` to be set by client
     */
    const session = await auth0Instance().getSession(req, res)

    if (session?.user) {
      Object.assign(req, { user: session.user })
    }

    const accessToken = (await auth0Instance().getAccessToken(req, res))
      .accessToken

    /**
     * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
     */
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`
    }
  } catch (error) {
    // console.log('error when get access token', error)
    // Apollo studio polls the graphql schema every second, and it pollutes the log
    // if (
    //   !getEnv().graphql.isLocal ||
    //   !req.headers['origin']?.includes('studio.apollographql')
    // ) {
    //   // console.error(e)
    // }
  }
}
