import type { IJobQueueResponse } from '@codelab/shared-abstract-infra'
import type { APIRequestContext } from '@playwright/test'

import { v4 } from 'uuid'

import type { ApiRequestPostOptions } from './api'

import { jobSubscription, requestOrThrow } from './api'

/**
 * This wrapper method will add `jobId` to the request body and return it
 */
export const jobQueueRequest = async (
  request: APIRequestContext,
  url: string,
  options: ApiRequestPostOptions,
): Promise<IJobQueueResponse> => {
  const jobId = v4()

  // Request the job to be started
  return await requestOrThrow<IJobQueueResponse>(request, url, {
    ...options,
    data: {
      ...options?.data,
      jobId,
    },
    method: 'POST',
  })
}

export const jobOutputRequest = async <T>(
  request: APIRequestContext,
  url: string,
  options: ApiRequestPostOptions,
) => {
  const result = await jobQueueRequest(request, url, options)

  return await jobSubscription<T>(result.jobId)
}
