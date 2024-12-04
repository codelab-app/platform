import { auth0Instance } from '@codelab/shared-infra-auth0/client'

export const fetchWithAuth = async (
  endpoint: string,
  init: RequestInit = {},
) => {
  const session = await auth0Instance.getSession()

  const headers = {
    ...init.headers,
    Authorization: `Bearer ${session?.accessToken}`,
    'X-ID-TOKEN': session?.idToken ?? '',
  }

  const response = await fetch(endpoint, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response
}
