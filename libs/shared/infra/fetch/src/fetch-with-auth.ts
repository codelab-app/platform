import { auth0Instance } from '@codelab/shared-infra-auth0/client'

import { batchFetch } from './batch-fetch'

/**
 * Client-side fetch with authentication.
 * If Authorization header is provided in options.headers, it will be used as-is.
 * Otherwise, it will get the user session token.
 *
 * GraphQL requests are automatically batched within a 20ms window.
 */
export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const headers = new Headers(options.headers)

  // If no Authorization header provided, get it from user session
  if (!headers.get('Authorization')) {
    const session = await auth0Instance.getSession()

    if (!session?.tokenSet.accessToken) {
      throw new Error('No user session found')
    }

    headers.set('Authorization', `Bearer ${session.tokenSet.accessToken}`)
  }

  const response = await batchFetch(endpoint, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text()

    console.error(errorText)
    throw new Error(errorText)
  }

  return response
}
