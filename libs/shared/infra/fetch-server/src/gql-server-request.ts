'use server'

import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { getEnv } from '@codelab/shared/config/env'
import { cLog } from '@codelab/shared/utils'
import { revalidateTag } from 'next/cache'

import type { NextFetchOptions } from './options'

export const gqlServerRequest = async <TResult, TVariables extends ObjectLike>(
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  /**
   * Place where we can call `revalidateTag` on the server side
   */
  next?: NextFetchOptions,
) => {
  /**
   * Dynamic import here since nested auth0 requires Request to work
   */
  const { serverFetchWithAuth } = await import('./server-fetch-with-auth')

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
    next,
  }).then((res) => {
    /**
     * Disable revalidation for now
     */
    // if (next?.revalidateTag) {
    //   revalidateTag(next.revalidateTag)
    // }

    return res
  })

  const { data, errors } = await response.json()

  if (errors && errors.length) {
    cLog(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
