'use server'

import type {
  NextFetchOptions,
  ObjectLike,
} from '@codelab/shared/abstract/types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { getEnv } from '@codelab/shared/config/env'
import { logger } from '@codelab/shared/infra/logging'
import { revalidateTag } from 'next/cache'

import { serverFetchWithAuth } from './server-fetch-with-auth'

/**
 * When you call server action in client component Next.js consider it as mutation and re-render the entire route segment
 */
export const gqlServerRequest = async <TResult, TVariables extends ObjectLike>(
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  /**
   * Place where we can call `revalidateTag` on the server side
   */
  next?: NextFetchOptions,
) => {
  const response = await serverFetchWithAuth(getEnv().endpoint.webGraphqlUrl, {
    body: JSON.stringify({
      query: document,
      variables,
    }),
    headers: {
      Accept: 'application/graphql-response+json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((res) => {
    if (next?.revalidateTags) {
      next.revalidateTags.forEach((tag) => revalidateTag(tag))
    }

    return res
  })

  const { data, errors } = await response.json()

  if (errors && errors.length) {
    logger.debug(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
