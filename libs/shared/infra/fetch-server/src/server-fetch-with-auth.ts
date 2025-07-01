'use server'

import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import Headers from '@mjackson/headers'

/**
 * Server fetch with authentication.
 * If Authorization header is provided in init.headers, it will be used as-is.
 * Otherwise, it will get the user session token.
 */
export const serverFetchWithAuth = async (
  endpoint: string,
  init: RequestInit,
) => {
  const headers = new Headers(init.headers)

  // If no Authorization header provided, get it from user session
  if (!headers.get('Authorization')) {
    const session = await auth0Instance.getSession()

    if (!session?.tokenSet.accessToken) {
      throw new Error('No user session found')
    }

    headers.set('Authorization', `Bearer ${session.tokenSet.accessToken}`)
  }

  console.log('Fetching with auth', endpoint, {
    ...init,
    headers: {
      Authorization: headers.get('Authorization'),
      'Content-Type': headers.get('Content-Type'),
    },
  })

  const response = await fetch(endpoint, {
    ...init,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text()

    console.error(errorText)
    throw new Error(errorText)
  }

  return response
}
