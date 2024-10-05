'use server'

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { getEnv } from '@codelab/shared/config'

export const gqlFetch = async <TResult, TVariables>(
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  next?: NextFetchRequestConfig,
) => {
  const response = await fetchWithAuth(getEnv().endpoint.webGraphqlUrl, {
    body: JSON.stringify({
      query: document,
      variables,
    }),
    headers: {
      Accept: 'application/graphql-response+json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    next,
  })

  const { data, errors } = await response.json()

  if (errors && errors.length) {
    console.log(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
