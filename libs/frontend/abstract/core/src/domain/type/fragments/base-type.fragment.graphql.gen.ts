import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../../user/owner.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../../user/owner.fragment.graphql.gen'
export type BaseType_ActionType_Fragment = {
  __typename: 'ActionType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_AppType_Fragment = {
  __typename: 'AppType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_ArrayType_Fragment = {
  __typename: 'ArrayType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_BaseType_Fragment = {
  __typename: 'BaseType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_CodeMirrorType_Fragment = {
  __typename: 'CodeMirrorType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_ElementType_Fragment = {
  __typename: 'ElementType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_EnumType_Fragment = {
  __typename: 'EnumType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_InterfaceType_Fragment = {
  __typename: 'InterfaceType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_LambdaType_Fragment = {
  __typename: 'LambdaType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_PageType_Fragment = {
  __typename: 'PageType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_PrimitiveType_Fragment = {
  __typename: 'PrimitiveType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_ReactNodeType_Fragment = {
  __typename: 'ReactNodeType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_RenderPropsType_Fragment = {
  __typename: 'RenderPropsType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseType_UnionType_Fragment = {
  __typename: 'UnionType'
  kind: Types.TypeKind
  id: string
  name: string
  owner: OwnerFragment
}

export type BaseTypeFragment =
  | BaseType_ActionType_Fragment
  | BaseType_AppType_Fragment
  | BaseType_ArrayType_Fragment
  | BaseType_BaseType_Fragment
  | BaseType_CodeMirrorType_Fragment
  | BaseType_ElementType_Fragment
  | BaseType_EnumType_Fragment
  | BaseType_InterfaceType_Fragment
  | BaseType_LambdaType_Fragment
  | BaseType_PageType_Fragment
  | BaseType_PrimitiveType_Fragment
  | BaseType_ReactNodeType_Fragment
  | BaseType_RenderPropsType_Fragment
  | BaseType_UnionType_Fragment

export const BaseTypeFragmentDoc = gql`
  fragment BaseType on IBaseType {
    __typename
    kind
    id
    owner {
      ...Owner
    }
    name
  }
  ${OwnerFragmentDoc}
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
