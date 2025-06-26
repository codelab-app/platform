/**
 * Copied from `next/types/global.d.ts`
 */
export interface NextFetchRequestConfig {
  revalidate?: number | false
  tags?: Array<string>
}

export interface NextTracingOptions {
  /**
   * Additional prefix for the operation ID.
   */
  attributes?: Record<string, string>
  /**
   * Static identifier for the GraphQL operation type (e.g., 'create-element').
   * Same operation always has the same ID.
   */
  operationId?: string
  /**
   * Dynamic UUID generated per request for tracing individual operations.
   */
  requestId?: string
}

/**
 * Add my own
 */
export type NextFetchOptions = NextFetchRequestConfig & {
  revalidateTags?: Array<string>
  tracing?: NextTracingOptions
}
