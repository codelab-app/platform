import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { getEnv } from '@codelab/shared/config'
import { cLog } from '@codelab/shared/utils'
import { withServerActionInstrumentation } from '@sentry/nextjs'
import { revalidateTag } from 'next/cache'

import { fetchWithAuth } from './fetch-with-auth'

export const gqlRequest = async <TResult, TVariables extends ObjectLike>(
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
) => {
  const response = fetchWithAuth(getEnv().endpoint.apiGraphqlUrl, {
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

  const { data, errors } = await (await response).json()

  if (errors && errors.length) {
    cLog(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
