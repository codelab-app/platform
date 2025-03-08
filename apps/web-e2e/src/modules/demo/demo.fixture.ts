import type {
  IJobOutput,
  IJobQueueResponse,
} from '@codelab/shared/abstract/infra'
import type { APIRequestContext } from '@playwright/test'

import { v4 } from 'uuid'

import { jobSubscription } from '../../api'
import { getTimestamp } from '../../commands'
import { jobOutputRequest, jobQueueRequest } from '../../job-request'
import { REQUEST_TIMEOUT } from '../../setup/config'

export const demoRequest = async (request: APIRequestContext) => {
  await jobOutputRequest(request, '/api/v1/demo/demo-background', {
    headers: {
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      'Keep-Alive': 'timeout=61',
    },
    timeout: REQUEST_TIMEOUT,
  })
}
