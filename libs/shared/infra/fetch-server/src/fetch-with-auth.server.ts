'use server'

import { fetchWithAuth } from '@codelab/shared-infra-fetch'

/**
 * Server-side fetch with authentication wrapper
 */
export const serverFetchWithAuth = async (
  endpoint: string,
  init: RequestInit,
): Promise<Response> => {
  return fetchWithAuth(endpoint, init)
}
