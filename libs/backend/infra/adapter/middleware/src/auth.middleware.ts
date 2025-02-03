import type { NextRequest, NextResponse } from 'next/server'

import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { mapAuth0IdTokenToUserDto } from '@codelab/shared-domain-module/user'
import { Auth0IdToken } from '@codelab/shared/abstract/core'

export const authMiddleware = async (
  request: NextRequest,
  response: NextResponse,
) => {
  try {
    /**
     * Requires `headers.cookie` to be set by client
     */
    const session = await auth0Instance.getSession()

    if (session?.user) {
      Object.assign(request, { user: session.user })
    }

    const { token } = await auth0Instance.getAccessToken()

    /**
     * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
     */
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }

    /**
     * Attach ID token so we have more information
     */
    // const idToken = session?.user['idToken']

    // request.headers.set('X-ID-TOKEN', String(idToken))

    if (session?.user) {
      const user = mapAuth0IdTokenToUserDto(session.user as Auth0IdToken)
      request.headers.set('X-USER-ID', user.id)
    }
  } catch (error) {
    console.error('error when getting session', error)
  }
}
