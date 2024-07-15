import { getEnv } from '@codelab/shared/config'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { request } from 'graphql-request'

export const swrFetcher = <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
) => request(getEnv().endpoint.graphqlApiUrl, document)
