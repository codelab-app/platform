'use server'

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { getEnv } from '@codelab/shared/config'
import { withServerActionInstrumentation } from '@sentry/nextjs'
import { revalidateTag } from 'next/cache'

import { fetchWithAuth } from './fetch-with-auth'

export const gqlFetch = async <TResult, TVariables>(
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  /**
   * Place where we can call `revalidateTag` on the server side
   */
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => {
  const response = await withServerActionInstrumentation(
    document.toString(),
    {},
    async () =>
      await fetchWithAuth(getEnv().endpoint.webGraphqlUrl, {
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
      }).then((res) => {
        if (next?.revalidateTag) {
          revalidateTag(next.revalidateTag)
        }

        return res
      }),
  )

  const { data, errors } = await response.json()

  if (errors && errors.length) {
    console.log(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
