import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type TypeBase_AppType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_ArrayType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_ElementType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_EnumType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_InterfaceType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_LambdaType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_MonacoType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_PageType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_PrimitiveType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_ReactNodeType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_RenderPropsType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
}

export type TypeBase_UnionType_Fragment = {
  kind: Types.TypeKind
  id: string
  name: string
  owner: { id: string; auth0Id: string }
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
    kind
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
