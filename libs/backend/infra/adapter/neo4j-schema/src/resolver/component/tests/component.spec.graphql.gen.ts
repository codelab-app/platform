import * as Types from '@codelab/shared/infra/gqlgen'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type ComponentResolverComponentsQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type ComponentResolverComponentsQuery = {
  components: Array<{
    id: string
    name: string
    slug: string
    elements: Array<{ id: string }>
    rootElement: { id: string }
  }>
}

export const ComponentResolverComponentsDocument = gql`
  query componentResolverComponents {
    components {
      elements {
        id
      }
      id
      name
      slug
      rootElement {
        id
      }
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
    componentResolverComponents(
      variables?: ComponentResolverComponentsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ComponentResolverComponentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ComponentResolverComponentsQuery>(
            ComponentResolverComponentsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'componentResolverComponents',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
