import type { TypedDocumentString } from './graphql/graphql'

export const execute = async <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) => {
  const response = await fetch(
    'https://swapi-graphql.netlify.app/.netlify/functions/index',
    {
      body: JSON.stringify({
        query: document,
        variables,
      }),
      headers: {
        Accept: 'application/graphql-response+json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json() as TResult
}
