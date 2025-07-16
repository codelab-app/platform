export interface BatchRequest {
  init: RequestInit
  url: string
  reject(error: Error): void
  resolve(value: Response): void
}

export interface BatchFetchConfig {
  /**
   * Time to wait for collecting requests (ms)
   * @default 20
   */
  batchInterval?: number

  /**
   * Optional logger for debugging
   */
  logger?: {
    debug(message: string, context: unknown): void
    error(message: string, context: unknown): void
    info(message: string, context: unknown): void
  }

  /**
   * Maximum requests per batch
   * @default 10
   */
  maxBatchSize?: number
}
