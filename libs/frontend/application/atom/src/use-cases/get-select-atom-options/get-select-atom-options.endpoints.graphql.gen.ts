import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
export type GetSelectAtomOptionsQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetSelectAtomOptionsQuery = {
  atoms: Array<{
    __typename: 'Atom'
    id: string
    name: string
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
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
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
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
