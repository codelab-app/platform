'use server'

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
import type { SpanAttributeValue } from '@sentry/types'

import { getEnv } from '@codelab/shared/config'
import { getActiveSpan, withServerActionInstrumentation } from '@sentry/nextjs'
import { ObjectTyped } from 'object-typed'

import { fetchWithAuth } from './fetch-with-auth'

export const gqlFetch = async <TResult, TVariables>(
  // use `.toString()` version of `TypedDocumentString`
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  next?: NextFetchRequestConfig,
) => {
  const span = getActiveSpan()

  // if (span && variables) {
  //   ObjectTyped.entries(variables).forEach(([key, value]) => {
  //     span.setAttributes({ [key]: value as SpanAttributeValue })
  //   })
  // }

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
      }),
  )

  const { data, errors } = await response.json()

  if (errors && errors.length) {
    console.log(document, variables, errors)

    throw new Error(errors[0]?.message)
  }

  return data as TResult
}
