import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type GetSelectAtomOptionsQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetSelectAtomOptionsQuery = {
  atoms: Array<{
    __typename: 'Atom'
    id: string
    name: string
    type: Types.AtomType
    requiredParents: Array<{ id: string; type: Types.AtomType }>
  }>
}

export const GetSelectAtomOptionsDocument = gql`
  query GetSelectAtomOptions {
    atoms {
      __typename
      id
      name
      requiredParents {
        id
        type
      }
      type
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
    GetSelectAtomOptions(
      variables?: GetSelectAtomOptionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetSelectAtomOptionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetSelectAtomOptionsQuery>(
            GetSelectAtomOptionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetSelectAtomOptions',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
