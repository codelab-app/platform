'use server'

import {
  batchFetch as clientBatchFetch,
  configureBatchFetcher,
  resetBatchFetcher as clientResetBatchFetcher,
} from '@codelab/shared-infra-fetch'
import { logger } from '@codelab/shared-infra-logging'

// Configure the batch fetcher with server logger on first import
configureBatchFetcher({ logger })

/**
 * Server-side batch fetch wrapper
 */
export const batchFetch = async (
  url: string,
  init: RequestInit = {},
): Promise<Response> => {
  return clientBatchFetch(url, init)
}

/**
 * Reset the batch fetcher instance (useful for testing)
 */
export const resetBatchFetcher = async () => {
  clientResetBatchFetcher()
}
