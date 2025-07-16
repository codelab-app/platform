'use server'

import type {
  NextFetchOptions,
  ObjectLike,
} from '@codelab/shared-abstract-types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { getEnv } from '@codelab/shared-config-env'
import {
  batchArrayMutations,
  extractOperationInfo,
} from '@codelab/shared-infra-fetch'
import { logger } from '@codelab/shared-infra-logger'
import { revalidateTag } from 'next/cache'

import { buildRequestHeaders } from './build-request-headers'
import { fetchWithAuth } from './fetch-with-auth.server'

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
  const headers = buildRequestHeaders(next)

  // Define the execute request function
  const executeRequest = async (
    doc: DocumentTypeDecoration<TResult, TVariables>,
    vars: TVariables,
    opts?: NextFetchOptions,
  ): Promise<TResult> => {
    // Extract operation name for this specific request (may differ in batch scenarios)
    const { operationName } = extractOperationInfo(doc)

    const response = await fetchWithAuth(getEnv().endpoint.webGraphqlUrl, {
      body: JSON.stringify({
        operationName,
        query: doc.toString(),
        variables: vars,
      }),
      headers,
      method: 'POST',
    }).then((res: Response) => {
      if (opts?.revalidateTags) {
        opts.revalidateTags.forEach((tag) => revalidateTag(tag))
      }

      return res
    })

    const { data, errors } = await response.json()

    if (errors && errors.length) {
      logger.debug(doc, vars, errors)
      throw new Error(errors[0]?.message)
    }

    return data as TResult
  }

  // batchArrayMutations will check if batching is needed and handle it accordingly
  return batchArrayMutations(document, variables, executeRequest, next)
}
