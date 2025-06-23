'use server'

import type {
  NextFetchOptions,
  ObjectLike,
} from '@codelab/shared-abstract-types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { getEnv } from '@codelab/shared-config-env'
import { logger } from '@codelab/shared-infra-logging'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

import { serverFetchWithAuth } from './server-fetch-with-auth'

/**
 * When you call server action in client component Next.js consider it as mutation and re-render the entire route segment
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
  // Get cookies from the request
  const cookieStore = await cookies()
  const serviceId = cookieStore.get('x-service-id')?.value
  const requestId = cookieStore.get('x-request-id')?.value

  // Build headers including cookie values
  const headers: Record<string, string> = {
    Accept: 'application/graphql-response+json',
    'Content-Type': 'application/json',
  }

  if (serviceId) {
    headers['x-service-id'] = serviceId
  }
  if (requestId) {
    headers['x-request-id'] = requestId
  }

  // Extract operation name from the query string
  const queryString = document.toString()
  const operationNameMatch = queryString.match(/(?:query|mutation|subscription)\s+(\w+)/)
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
