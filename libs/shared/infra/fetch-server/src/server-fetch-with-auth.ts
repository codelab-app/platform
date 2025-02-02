'use server'

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
/**
 * Need to be callback, otherwise import chain will call `auth0-server.provider.ts` which requires Next.js `request` to be present
 *
 * This occurs during testing context
 */
// eslint-disable-next-line @nx/enforce-module-boundaries
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'

export const serverFetchWithAuth = async (
  endpoint: string,
  init: RequestInit & NextFetchOptions = {},
) => {
  /**
   * Need to be callback, otherwise import chain will call `auth0-server.provider.ts` which requires Next.js `request` to be present
   *
   * This occurs during testing context
   */

  // FIXME: maybe we don't need this import anymore 
  const { auth0Instance } = await import('@codelab/shared-infra-auth0/client')

  const session = await auth0Instance.getSession()

  const headers = {
    ...init.headers,
    Authorization: `Bearer ${session?.tokenSet.accessToken}`,
    // 'X-ID-TOKEN': session?.idToken ?? '',
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
