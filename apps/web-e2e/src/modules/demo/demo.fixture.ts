import type { APIRequestContext } from '@playwright/test'

import { getTimestamp } from '../../commands'
import { REQUEST_TIMEOUT } from '../../setup/config'

export const demoRequest = async (request: APIRequestContext) => {
  const response = await request.post('/api/v1/app/demo-timeout', {
    headers: {
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      'Keep-Alive': 'timeout=61',
    },
    timeout: REQUEST_TIMEOUT,
  })

  console.log(response)

  if (!response.ok()) {
    const text = await response.text()

    console.error(`[${getTimestamp()}] Server response:`, text)
    // console.log(response)
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  // Read response as text instead of trying to parse as JSON
  const text = await response.text()

  console.log(text)

  // The server sends the final empty object when complete
  // We can just return an empty object to indicate success
}
