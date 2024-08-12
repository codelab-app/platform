'use server'

import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'

export const fetchWithAuth = async (
  endpoint: string,
  init: RequestInit = {},
) => {
  const session = await auth0ServerInstance.getSession()

  const headers = {
    ...init.headers,
    Authorization: `Bearer ${session?.accessToken}`,
    'X-ID-TOKEN': session?.idToken ?? '',
  }

  console.log(headers)

  const response = await fetch(endpoint, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response
}
