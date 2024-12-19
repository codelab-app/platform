'use server'

export const serverFetchWithAuth = async (
  endpoint: string,
  init: RequestInit = {},
) => {
  /**
   * Need to be callback, otherwise import chain will call `auth0-server.provider.ts` which requires Next.js `request` to be present
   *
   * This occurs during testing context
   */
  const { auth0ServerInstance } = await import(
    '@codelab/shared-infra-auth0/server'
  )

  const session = await auth0ServerInstance.getSession()

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
