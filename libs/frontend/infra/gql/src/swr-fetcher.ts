import { getEnv } from '@codelab/shared/config'
import { request } from 'graphql-request'
import type { TypedDocumentString } from './graphql/graphql'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

export const swrFetcher = <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
) => request(getEnv().endpoint.graphqlApiUrl, document)
