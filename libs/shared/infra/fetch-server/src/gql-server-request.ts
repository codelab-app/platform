'use server'

import type {
  NextFetchOptions,
  ObjectLike,
} from '@codelab/shared-abstract-types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { getEnv } from '@codelab/shared-config-env'
import { logger } from '@codelab/shared-infra-logging'
import { TRACING_HEADERS } from '@codelab/shared-infra-tracing'
import { revalidateTag } from 'next/cache'

import { serverFetchWithAuth } from './server-fetch-with-auth'

/**
 * Server-side GraphQL request function that handles authentication and logging.
 * When you call server action in client component Next.js consider it as mutation and re-render the entire route segment
 *
 * @param document - GraphQL document to execute
 * @param variables - Variables for the GraphQL query/mutation
 * @param next - NextFetchOptions including logging configuration
 */
export const gqlServerRequest = async <TResult, TVariables extends ObjectLike>(
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  /**
   * Place where we can call `revalidateTag` on the server side
   */
  next?: NextFetchOptions,
) => {
  // Build headers including logging values from options
  const headers: Record<string, string> = {
    Accept: 'application/graphql-response+json',
    'Content-Type': 'application/json',
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

  // Extract operation name from the query string
  const queryString = document.toString()
  const operationNameMatch = queryString.match(
    /(?:query|mutation|subscription)\s+(\w+)/,
  )
  const operationName = operationNameMatch ? operationNameMatch[1] : undefined

  const response = await serverFetchWithAuth(getEnv().endpoint.webGraphqlUrl, {
    body: JSON.stringify({
      query: queryString,
      variables,
      operationName,
    }),
    headers,
    method: 'POST',
  }).then((res) => {
    if (next?.revalidateTags) {
      next.revalidateTags.forEach((tag) => revalidateTag(tag))
    }

    return res
  })

  const { data, errors } = await response.json()

  if (errors && errors.length) {
    logger.debug(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
