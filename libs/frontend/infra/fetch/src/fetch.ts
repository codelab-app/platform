'use server'

import { getEnv } from '@codelab/shared/config'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'

export const fetchWithAuth = async (
  endpoint: string,
  init: RequestInit = {},
) => {
  const session = await auth0ServerInstance.getSession()

  return corsFetch(endpoint, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${session?.accessToken}`,
      'X-ID-TOKEN': session?.idToken ?? '',
    },
  })
}

export const corsFetch = async (endpoint: string, init: RequestInit = {}) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    ...(init.headers ?? {}),
  }

  const apiUrl = new URL(`api/${endpoint}`, getEnv().endpoint.apiHost)

  const response = await fetch(apiUrl, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new Error(await response.json())
  }

  return response
}
