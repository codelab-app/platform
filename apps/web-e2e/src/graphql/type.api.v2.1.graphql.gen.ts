import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type E2eCreatePrimitiveTypesMutationVariables = Types.Exact<{
  input: Array<Types.PrimitiveTypeCreateInput> | Types.PrimitiveTypeCreateInput
}>

export type E2eCreatePrimitiveTypesMutation = {
  __typename?: 'Mutation'
  createPrimitiveTypes: {
    __typename?: 'CreatePrimitiveTypesMutationResponse'
    primitiveTypes: Array<{
      __typename?: 'PrimitiveType'
      primitiveKind: Types.PrimitiveTypeKind
      id: string
      name: string
      typeKind: 'PrimitiveType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eTypeBase_AppType_Fragment = {
  __typename?: 'AppType'
  id: string
  name: string
  typeKind: 'AppType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_ArrayType_Fragment = {
  __typename?: 'ArrayType'
  id: string
  name: string
  typeKind: 'ArrayType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_ElementType_Fragment = {
  __typename?: 'ElementType'
  id: string
  name: string
  typeKind: 'ElementType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_EnumType_Fragment = {
  __typename?: 'EnumType'
  id: string
  name: string
  typeKind: 'EnumType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_InterfaceType_Fragment = {
  __typename?: 'InterfaceType'
  id: string
  name: string
  typeKind: 'InterfaceType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_LambdaType_Fragment = {
  __typename?: 'LambdaType'
  id: string
  name: string
  typeKind: 'LambdaType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_MonacoType_Fragment = {
  __typename?: 'MonacoType'
  id: string
  name: string
  typeKind: 'MonacoType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_PageType_Fragment = {
  __typename?: 'PageType'
  id: string
  name: string
  typeKind: 'PageType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_PrimitiveType_Fragment = {
  __typename?: 'PrimitiveType'
  id: string
  name: string
  typeKind: 'PrimitiveType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_ReactNodeType_Fragment = {
  __typename?: 'ReactNodeType'
  id: string
  name: string
  typeKind: 'ReactNodeType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_RenderPropsType_Fragment = {
  __typename?: 'RenderPropsType'
  id: string
  name: string
  typeKind: 'RenderPropsType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_UnionType_Fragment = {
  __typename?: 'UnionType'
  id: string
  name: string
  typeKind: 'UnionType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBaseFragment =
  | E2eTypeBase_AppType_Fragment
  | E2eTypeBase_ArrayType_Fragment
  | E2eTypeBase_ElementType_Fragment
  | E2eTypeBase_EnumType_Fragment
  | E2eTypeBase_InterfaceType_Fragment
  | E2eTypeBase_LambdaType_Fragment
  | E2eTypeBase_MonacoType_Fragment
  | E2eTypeBase_PageType_Fragment
  | E2eTypeBase_PrimitiveType_Fragment
  | E2eTypeBase_ReactNodeType_Fragment
  | E2eTypeBase_RenderPropsType_Fragment
  | E2eTypeBase_UnionType_Fragment

export type E2ePrimitiveTypeFragment = {
  __typename?: 'PrimitiveType'
  primitiveKind: Types.PrimitiveTypeKind
  id: string
  name: string
  typeKind: 'PrimitiveType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export const E2eTypeBaseFragmentDoc = gql`
  fragment E2eTypeBase on TypeBase {
    typeKind: __typename
    id
    owner {
      id
      auth0Id
    }
    name
  }
`
export const E2ePrimitiveTypeFragmentDoc = gql`
  fragment E2ePrimitiveType on PrimitiveType {
    ...E2eTypeBase
    primitiveKind
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eCreatePrimitiveTypesDocument = gql`
  mutation E2eCreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
    createPrimitiveTypes(input: $input) {
      primitiveTypes {
        ...E2ePrimitiveType
      }
    }
  }
  ${E2ePrimitiveTypeFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    E2eCreatePrimitiveTypes(
      variables: E2eCreatePrimitiveTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreatePrimitiveTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreatePrimitiveTypesMutation>(
            E2eCreatePrimitiveTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreatePrimitiveTypes',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
