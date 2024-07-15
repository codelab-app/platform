import type { TypedDocumentString } from '@codelab/frontend/infra/gql'
import { getEnv } from '@codelab/shared/config'

export const swrFetcher = async <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
) => {
  const response = await fetch(getEnv().endpoint.graphqlApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: document,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const result = await response.json()
  return result.data as TResult
}
