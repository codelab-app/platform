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

    const accessToken = session?.accessToken

    console.log('accessToken', accessToken)

    /**
     * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
     */
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`
    }

    /**
     * Attach ID token so we have more information
     */
    const idToken = session?.idToken

    console.log('idToken', idToken)

    if (idToken) {
      req.headers['X-ID-TOKEN'] = idToken
    }
  } catch (error) {
    console.log('error when getting session', error)
  }
}
