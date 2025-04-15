import type { APIRequestContext } from '@playwright/test'

import { getTimestamp } from '@codelab/shared-infra-logging'

/**
 * Extract the options type from Playwright's APIRequestContext methods
 */
export type ApiRequestPostOptions = Parameters<APIRequestContext['post']>[1]
export type ApiRequestGetOptions = Parameters<APIRequestContext['get']>[1]

/**
 * Helper function to make API requests that automatically throws on non-OK responses
 */
export const requestOrThrow = async <T = void>(
  request: APIRequestContext,
  url: string,
  options:
    | (ApiRequestGetOptions & { method: 'GET' })
    | (ApiRequestPostOptions & { method: 'POST' }) = {
    method: 'POST',
  },
): Promise<T> => {
  const { method, ...rest } = options

  console.log(`[${getTimestamp()}] Requesting ${url} [${method}]`)

  const response =
    method === 'GET'
      ? await request.get(`/api/v1/${url}`, rest)
      : await request.post(`/api/v1/${url}`, rest)

  if (!response.ok()) {
    const text = await response.text()

    console.error('Server response:', text)
    throw new Error(`HTTP error! status: ${response.status()}`)
  }

  const contentType = response.headers()['content-type']

  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>
  } else {
    console.log('Content-Type not found', contentType)
  }

  // Return empty response or null for non-JSON responses
  return Promise.resolve<T>(null as T)
}
