/**
 * HTTP header constants for distributed tracing
 */
export const TRACING_HEADERS = {
  /**
   * The operation ID
   */
  OPERATION_ID: 'x-operation-id',
  /**
   * The instance of an operation
   */
  REQUEST_ID: 'x-request-id',
  /**
   * The service component (e.g., NextJS layout/page) that initiated the operation
   */
  SERVICE_COMPONENT: 'x-service-component',
} as const

export type TracingHeaderKey =
  (typeof TRACING_HEADERS)[keyof typeof TRACING_HEADERS]
