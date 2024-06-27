import { getEnv } from '@codelab/shared/config'
import type { TypedDocumentString } from './graphql/graphql'
import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'

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
    next: { tags: [CACHE_TAGS.APP_LIST] },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const { data } = await response.json()

  return data as TResult
}
