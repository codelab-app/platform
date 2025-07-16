import type { NextFetchOptions } from '@codelab/shared-abstract-types'

import { TRACING_HEADERS } from '@codelab/shared-infra-tracing'

/**
 * Builds headers for GraphQL requests including tracing headers
 */
export const buildRequestHeaders = (
  next?: NextFetchOptions,
): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: 'application/graphql-response+json',
    'Content-Type': 'application/json',
    ...next?.headers,
  }

  if (next?.tracing?.operationId) {
    headers[TRACING_HEADERS.OPERATION_ID] = next.tracing.operationId
  }

  if (next?.tracing?.requestId) {
    headers[TRACING_HEADERS.REQUEST_ID] = next.tracing.requestId
  }

  if (next?.tracing?.attributes?.['service.component']) {
    headers[TRACING_HEADERS.SERVICE_COMPONENT] =
      next.tracing.attributes['service.component']
  }

  return headers
}
