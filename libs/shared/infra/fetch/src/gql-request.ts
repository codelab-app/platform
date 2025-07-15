import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
import type { GraphQLClient } from 'graphql-request'

import { executeWithArrayBatching, needsArrayBatching } from './batch-mutation-wrapper'

export const gqlRequest = async <TResult, TVariables extends ObjectLike>(
  client: GraphQLClient,
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
) => {
  client.setHeaders({
    Accept: 'application/graphql-response+json',
    Connection: 'keep-alive',
    'Content-Type': 'application/json',
  })

  // Extract operation name from the query string
  const queryString = document.toString()
  const operationNameMatch = queryString.match(
    /(?:query|mutation|subscription)\s+(\w+)/,
  )
  const operationName = operationNameMatch ? operationNameMatch[1] : undefined

  // Check if this mutation needs array batching
  const batchConfig = needsArrayBatching(operationName, variables)

  if (batchConfig && operationName) {
    // Execute with array batching
    return executeWithArrayBatching(
      document,
      variables,
      operationName,
      batchConfig,
      async (doc, vars) => {
        /**
         * @throws {GraphQLError}
         */
        return await client.request<TResult>(doc.toString(), vars)
      },
    )
  }

  // Normal execution without batching
  /**
   * @throws {GraphQLError}
   */
  return await client.request<TResult>(queryString, variables)
}
