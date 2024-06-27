import { getEnv } from '@codelab/shared/config'
import type { TypedDocumentString } from './graphql/graphql'

export const execute = async <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
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
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const { data } = await response.json()

  return data as TResult
}
