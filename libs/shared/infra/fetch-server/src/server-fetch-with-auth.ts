'use server'

import { auth0Instance } from '@codelab/shared-infra-auth0/client'
/**
 * Need to be callback, otherwise import chain will call `auth0-server.provider.ts` which requires Next.js `request` to be present
 *
 * This occurs during testing context
 */

export const serverFetchWithAuth = async (
  endpoint: string,
  init: RequestInit,
) => {
  /**
   * Need to be callback, otherwise import chain will call `auth0-server.provider.ts` which requires Next.js `request` to be present
   *
   * This occurs during testing context
   */

  const session = await auth0Instance.getSession()

  const headers = {
    ...init.headers,
    Authorization: `Bearer ${session?.tokenSet.accessToken}`,
    // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
  }

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
