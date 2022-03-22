import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  TypeBase_AppType_Fragment,
  TypeBase_ArrayType_Fragment,
  TypeBase_ElementType_Fragment,
  TypeBase_EnumType_Fragment,
  TypeBase_InterfaceType_Fragment,
  TypeBase_LambdaType_Fragment,
  TypeBase_MonacoType_Fragment,
  TypeBase_PageType_Fragment,
  TypeBase_PrimitiveType_Fragment,
  TypeBase_ReactNodeType_Fragment,
  TypeBase_RenderPropsType_Fragment,
  TypeBase_UnionType_Fragment,
} from './TypeBase.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
import { TypeBaseFragmentDoc } from './TypeBase.fragment.v2.1.graphql.gen'
export type InterfaceTypeFragment = {
  descendantTypesIds: Array<string>
  fieldsConnection: { edges: Array<InterfaceTypeFieldEdgeFragment> }
} & TypeBase_InterfaceType_Fragment

export type InterfaceTypeFieldEdgeFragment = {
  key: string
  description?: string | null | undefined
  cursor: string
  name?: string | null | undefined
  node:
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
}

export const InterfaceTypeFieldEdgeFragmentDoc = gql`
  fragment InterfaceTypeFieldEdge on InterfaceTypeFieldsRelationship {
    key
    description
    cursor
    name
    node {
      id
    }
  }
`
export const InterfaceTypeFragmentDoc = gql`
  fragment InterfaceType on InterfaceType {
    ...TypeBase
    fieldsConnection {
      edges {
        ...InterfaceTypeFieldEdge
      }
    }
    descendantTypesIds
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
