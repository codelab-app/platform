import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
import type { GraphQLClient } from 'graphql-request'

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

  /**
   * @throws {GraphQLError}
   */
  return await client.request<TResult>(document.toString(), variables)
}
