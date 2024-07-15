import { getEnv } from '@codelab/shared/config'
import type { TypedDocumentString } from './graphql/graphql'
import isArray from 'lodash/isArray'

export const execute = async <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
  next?: NextFetchRequestConfig,
) => {
  const response = await fetch(getEnv().endpoint.graphqlApiUrl, {
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

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const json = await response.json()

  const { data, errors } = json

  if (isArray(errors) && errors.length) {
    throw new Error(errors[0].message)
  }

  return data as TResult
}
