import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
import type { GraphQLClient } from 'graphql-request'

import { getEnv } from '@codelab/shared/config/env'
import { cLog } from '@codelab/shared/utils'

import { fetchWithAuth } from './fetch-with-auth'

export const gqlRequest = async <TResult, TVariables extends ObjectLike>(
  client: GraphQLClient,
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
) => {
  const response = fetchWithAuth(getEnv().endpoint.apiGraphqlUrl, {
    body: JSON.stringify({
      query: document,
      variables,
    }),
    headers: {
      Accept: 'application/graphql-response+json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  const { data, errors } = await (await response).json()

  if (errors && errors.length) {
    cLog(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
