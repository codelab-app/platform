import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type TypeBase_AppType_Fragment = {
  id: string
  name: string
  typeKind: 'AppType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_ArrayType_Fragment = {
  id: string
  name: string
  typeKind: 'ArrayType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_ElementType_Fragment = {
  id: string
  name: string
  typeKind: 'ElementType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_EnumType_Fragment = {
  id: string
  name: string
  typeKind: 'EnumType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_InterfaceType_Fragment = {
  id: string
  name: string
  typeKind: 'InterfaceType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_LambdaType_Fragment = {
  id: string
  name: string
  typeKind: 'LambdaType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_MonacoType_Fragment = {
  id: string
  name: string
  typeKind: 'MonacoType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_PageType_Fragment = {
  id: string
  name: string
  typeKind: 'PageType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_PrimitiveType_Fragment = {
  id: string
  name: string
  typeKind: 'PrimitiveType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_ReactNodeType_Fragment = {
  id: string
  name: string
  typeKind: 'ReactNodeType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_RenderPropsType_Fragment = {
  id: string
  name: string
  typeKind: 'RenderPropsType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBase_UnionType_Fragment = {
  id: string
  name: string
  typeKind: 'UnionType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type TypeBaseFragment =
  | TypeBase_AppType_Fragment
  | TypeBase_ArrayType_Fragment
  | TypeBase_ElementType_Fragment
  | TypeBase_EnumType_Fragment
  | TypeBase_InterfaceType_Fragment
  | TypeBase_LambdaType_Fragment
  | TypeBase_MonacoType_Fragment
  | TypeBase_PageType_Fragment
  | TypeBase_PrimitiveType_Fragment
  | TypeBase_ReactNodeType_Fragment
  | TypeBase_RenderPropsType_Fragment
  | TypeBase_UnionType_Fragment

export const TypeBaseFragmentDoc = gql`
  fragment TypeBase on TypeBase {
    typeKind: __typename
    id
    owner {
      id
      auth0Id
    }
    name
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
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
