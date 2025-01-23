import * as Types from '@codelab/shared/infra/gqlgen'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type PageResolverPagesQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type PageResolverPagesQuery = {
  pages: Array<{
    id: string
    name: string
    slug: string
    elements: Array<{ id: string }>
    rootElement: { id: string }
  }>
}

export const PageResolverPagesDocument = gql`
  query pageResolverPages {
    pages {
      elements {
        id
      }
      id
      name
      rootElement {
        id
      }
      slug
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    pageResolverPages(
      variables?: PageResolverPagesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PageResolverPagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageResolverPagesQuery>(
            PageResolverPagesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'pageResolverPages',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
