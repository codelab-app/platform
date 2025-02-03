'use server'

import { mapAuth0IdTokenToUserDto } from '@codelab/shared-domain-module/user'
import { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { NextFetchOptions } from '@codelab/shared/abstract/types'
/**
 * Need to be callback, otherwise import chain will call `auth0-server.provider.ts` which requires Next.js `request` to be present
 *
 * This occurs during testing context
 */

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

  const user = mapAuth0IdTokenToUserDto(session?.user as Auth0IdToken)

  const headers = {
    ...init.headers,
    Authorization: `Bearer ${session?.tokenSet.accessToken}`,
    // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
    'X-USER-ID': user.id,
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
