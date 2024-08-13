import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import type { NextRequest, NextResponse } from 'next/server'

export const authMiddleware = async (
  request: NextRequest,
  response: NextResponse,
) => {
  try {
    /**
     * Requires `headers.cookie` to be set by client
     */
    const session = await auth0Instance.getSession(request, response)

    if (session?.user) {
      Object.assign(request, { user: session.user })
    }

    const accessToken = session?.accessToken

    /**
     * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
     */
    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`)
    }

    /**
     * Attach ID token so we have more information
     */
    const idToken = session?.idToken

    if (idToken) {
      request.headers.set('X-ID-TOKEN', idToken)
    }
  } catch (error) {
    console.error('error when getting session', error)
  }
}
