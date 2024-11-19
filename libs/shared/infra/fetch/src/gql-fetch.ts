'use server'

import type {
  NextFetchOptions,
  ObjectLike,
} from '@codelab/shared/abstract/types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { getEnv } from '@codelab/shared/config'
import { cLog } from '@codelab/shared/utils'
import { withServerActionInstrumentation } from '@sentry/nextjs'
import { revalidateTag } from 'next/cache'

import { fetchWithAuth } from './fetch-with-auth'

export const gqlFetch = async <TResult, TVariables extends ObjectLike>(
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  /**
   * Place where we can call `revalidateTag` on the server side
   */
  next?: NextFetchOptions,
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
    cLog(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
