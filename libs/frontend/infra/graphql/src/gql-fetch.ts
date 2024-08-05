'use server'

import isArray from 'lodash/isArray'
import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import type { TypedDocumentString } from '@codelab/frontend/infra/gql'
import { getEnv } from '@codelab/shared/config'

export const gqlFetch = async <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
  next?: NextFetchRequestConfig,
) => {
  const response = await fetchWithAuth(getEnv().endpoint.graphqlApiUrl, {
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

  if (errors && isArray(errors) && errors.length) {
    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
