import type { APIRequestContext } from '@playwright/test'

import { getTimestamp } from '../../commands'
import { REQUEST_TIMEOUT } from '../../setup/config'

export const demoRequest = async (request: APIRequestContext) => {
  const response = await request.post('/api/v1/app/demo', {
    headers: {
      Connection: 'keep-alive',
      'Keep-Alive': 'timeout=120',
    },
    timeout: REQUEST_TIMEOUT,
  })

  if (!response.ok()) {
    const text = await response.text()

    console.error(`[${getTimestamp()}] Server response:`, text)
    console.log(response)
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json() as Promise<unknown>
}
