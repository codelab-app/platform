'use server'

import isArray from 'lodash/isArray'
import type { TypedDocumentString } from './graphql/graphql'
import { fetchWithAuth } from '@codelab/frontend-infra-fetch'

export const gqlFetch = async <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
  next?: NextFetchRequestConfig,
) => {
  const response = await fetchWithAuth('graphql', {
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
