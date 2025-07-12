interface BatchRequest {
  init: RequestInit
  url: string
  reject(error: Error): void
  resolve(value: Response): void
}

interface BatchFetchConfig {
  /**
   * Time to wait for collecting requests (ms)
   * @default 20
   */
  batchInterval?: number

  /**
   * Maximum requests per batch
   * @default 10
   */
  maxBatchSize?: number

  /**
   * Optional logger for debugging
   */
  logger?: {
    debug: (message: string, context: any) => void
    info: (message: string, context: any) => void
    error: (message: string, context: any) => void
  }
}

/**
 * Generic batch fetcher that batches multiple fetch requests within a time window
 */
class BatchFetcher {
  async fetch(url: string, init: RequestInit = {}): Promise<Response> {
    // For non-GraphQL requests, pass through directly
    if (!this.isGraphQLRequest(url, init)) {
      return fetch(url, init)
    }

    return new Promise((resolve, reject) => {
      this.queue.push({ init, reject, resolve, url })
      this.scheduleBatch()
    })
  }

  private config: Required<Omit<BatchFetchConfig, 'logger'>> & BatchFetchConfig

  private async executeBatch() {
    // Clear timer
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }

    // Get all requests from queue
    const requests = [...this.queue]

    this.queue = []

    if (requests.length === 0) {
      return
    }

    const startTime = Date.now()

    try {
      // If only one request, skip batching
      if (requests.length === 1) {
        const [request] = requests

        if (!request) {
          return
        }

        const response = await fetch(request.url, request.init)

        request.resolve(response)

        return
      }

      // All requests should go to the same endpoint
      const firstUrl = requests[0]?.url

      if (!firstUrl || !requests.every((req) => req.url === firstUrl)) {
        throw new Error('Cannot batch requests to different URLs')
      }

      // Extract GraphQL operations from each request
      const batchedQueries = requests.map((req) => {
        const body = JSON.parse(req.init.body as string)

        return body
      })

      // Use headers from first request (they should all have the same auth)
      const headers = requests[0]?.init.headers

      this.config.logger?.debug('Executing GraphQL batch', {
        context: 'batch-fetch',
        data: {
          batchSize: requests.length,
          url: firstUrl,
        },
      })

      // Execute batch request
      const batchResponse = await fetch(firstUrl, {
        body: JSON.stringify(batchedQueries),
        headers,
        method: 'POST',
      })

      if (!batchResponse.ok) {
        const errorText = await batchResponse.text()

        throw new Error(
          `Batch request failed: ${batchResponse.status} ${batchResponse.statusText} - ${errorText}`,
        )
      }

      // Parse batch response
      const batchResults = await batchResponse.json()

      if (!Array.isArray(batchResults)) {
        throw new Error('Expected array response for batched queries')
      }

      if (batchResults.length !== requests.length) {
        throw new Error(
          `Response count mismatch: expected ${requests.length}, got ${batchResults.length}`,
        )
      }

      // Create individual responses
      requests.forEach((request, index) => {
        const result = batchResults[index]

        if (result) {
          const response = new Response(JSON.stringify(result), {
            headers: batchResponse.headers,
            status: 200,
            statusText: 'OK',
          })

          request.resolve(response)
        } else {
          request.reject(new Error('No response for request'))
        }
      })

      const duration = Date.now() - startTime

      this.config.logger?.info('GraphQL batch completed', {
        context: 'batch-fetch',
        data: {
          batchSize: requests.length,
          duration,
        },
      })
    } catch (error) {
      const duration = Date.now() - startTime

      this.config.logger?.error('GraphQL batch failed', {
        context: 'batch-fetch',
        data: {
          batchSize: requests.length,
          duration,
          error: error instanceof Error ? error.message : String(error),
        },
      })

      // Reject all requests with the same error
      requests.forEach((request) => {
        request.reject(
          error instanceof Error ? error : new Error(String(error)),
        )
      })
    }
  }

  private isGraphQLRequest(url: string, init: RequestInit): boolean {
    if (init.method !== 'POST' || !url.includes('/graphql')) {
      return false
    }

    // Check Content-Type header
    const headers = new Headers(init.headers)

    return headers.get('Content-Type') === 'application/json'
  }

  private queue: Array<BatchRequest> = []

  private scheduleBatch() {
    // If we've reached max batch size, execute immediately
    if (this.queue.length >= this.config.maxBatchSize) {
      void this.executeBatch()

      return
    }

    // Otherwise, schedule batch execution
    if (!this.timer) {
      this.timer = setTimeout(() => {
        void this.executeBatch()
      }, this.config.batchInterval)
    }
  }

  private timer: NodeJS.Timeout | null = null

  constructor(config: BatchFetchConfig = {}) {
    this.config = {
      batchInterval: 20,
      maxBatchSize: 10,
      ...config,
    }
  }
}

// Single instance
let batchFetcherInstance: BatchFetcher | null = null

/**
 * Configure the batch fetcher (optional)
 */
export const configureBatchFetcher = (config: BatchFetchConfig) => {
  batchFetcherInstance = new BatchFetcher(config)
}

/**
 * Get or create the batch fetcher instance
 */
export const batchFetch = (
  url: string,
  init: RequestInit = {},
): Promise<Response> => {
  if (!batchFetcherInstance) {
    batchFetcherInstance = new BatchFetcher()
  }

  return batchFetcherInstance.fetch(url, init)
}

/**
 * Reset the batch fetcher instance (useful for testing)
 */
export const resetBatchFetcher = () => {
  batchFetcherInstance = null
}
