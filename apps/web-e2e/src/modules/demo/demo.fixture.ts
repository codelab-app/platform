import type { APIRequestContext } from '@playwright/test'

import { jobOutputRequest } from '../../job-request'
import { REQUEST_TIMEOUT } from '../../setup/config'
import { baseTest } from '../../setup/fixtures/base.fixture'

export const demoRequest = async (request: APIRequestContext) => {
  await jobOutputRequest(request, 'demo/demo-background', {
    headers: {
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      'Keep-Alive': 'timeout=61',
    },
    timeout: REQUEST_TIMEOUT,
  })
}

export const test = baseTest.extend({})
