import type { ObjectLike } from '@codelab/shared/abstract/types'
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
    'Content-Type': 'application/json',
  })

  /**
   * @throws {GraphQLError}
   */
  return await client.request<TResult>(document.toString(), variables)

  // try {
  //   const data = await client.request<TResult>(document.toString(), variables)

  //   return data
  // } catch (error: unknown) {
  //   if (typeof error === 'object' && error !== null && 'response' in error) {
  //     const gqlError = error as {
  //       response: { errors?: Array<{ message: string }> }
  //     }

  //     if (gqlError.response.errors) {
  //       cLog(document, variables, gqlError.response.errors)
  //       throw new Error(gqlError.response.errors[0]?.message)
  //     }
  //   }

  //   throw error
  // }
}
