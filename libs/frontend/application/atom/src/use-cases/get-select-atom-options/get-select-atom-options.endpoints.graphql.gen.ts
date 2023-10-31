import * as Types from '@codelab/shared/abstract/codegen'

import { InterfaceTypeFragment } from '../../../../../abstract/domain/src/type/fragments/interface.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { InterfaceTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/interface.fragment.graphql.gen'
export type GetSelectAtomOptionsQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetSelectAtomOptionsQuery = {
  atoms: Array<{
    __typename: 'Atom'
    id: string
    name: string
    type: Types.AtomType
    api: InterfaceTypeFragment
    requiredParents: Array<{ id: string; type: Types.AtomType }>
  }>
}

export const GetSelectAtomOptionsDocument = gql`
  query GetSelectAtomOptions {
    atoms {
      __typename
      api {
        ...InterfaceType
      }
      id
      name
      requiredParents {
        id
        type
      }
      type
    }
  }
  ${InterfaceTypeFragmentDoc}
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
