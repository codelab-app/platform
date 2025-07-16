import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
import type { GraphQLClient } from 'graphql-request'

import { batchArrayMutations } from './array-batching'

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

  // Define the execute request function
  const executeRequest = async (
    doc: DocumentTypeDecoration<TResult, TVariables>,
    vars: TVariables,
  ): Promise<TResult> => {
    /**
     * @throws {GraphQLError}
     */
    return await client.request<TResult>(doc.toString(), vars)
  }

  // batchArrayMutations will check if batching is needed and handle it accordingly
  return batchArrayMutations(document, variables, executeRequest)
}
