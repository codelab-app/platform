import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from 'graphql-request'
export type TypeBase_AppType_Fragment = {
  id: string
  name: string
  typeKind: 'AppType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_ArrayType_Fragment = {
  id: string
  name: string
  typeKind: 'ArrayType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_ElementType_Fragment = {
  id: string
  name: string
  typeKind: 'ElementType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_EnumType_Fragment = {
  id: string
  name: string
  typeKind: 'EnumType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_InterfaceType_Fragment = {
  id: string
  name: string
  typeKind: 'InterfaceType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_LambdaType_Fragment = {
  id: string
  name: string
  typeKind: 'LambdaType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_MonacoType_Fragment = {
  id: string
  name: string
  typeKind: 'MonacoType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_PageType_Fragment = {
  id: string
  name: string
  typeKind: 'PageType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_PrimitiveType_Fragment = {
  id: string
  name: string
  typeKind: 'PrimitiveType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_ReactNodeType_Fragment = {
  id: string
  name: string
  typeKind: 'ReactNodeType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_RenderPropsType_Fragment = {
  id: string
  name: string
  typeKind: 'RenderPropsType'
  owner?: { id: string; auth0Id: string } | null
}

export type TypeBase_UnionType_Fragment = {
  id: string
  name: string
  typeKind: 'UnionType'
  owner?: { id: string; auth0Id: string } | null
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
