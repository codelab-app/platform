import * as Types from '@codelab/shared/abstract/codegen'

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
} from './type-base.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { TypeBaseFragmentDoc } from './type-base.fragment.graphql.gen'
export type ArrayTypeWithItemTypeFragment = {
  itemType: Array<
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
  >
} & ArrayTypeFragment

export type ArrayTypeFragment = {
  itemType: Array<
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
  >
} & TypeBase_ArrayType_Fragment

export const ArrayTypeFragmentDoc = gql`
  fragment ArrayType on ArrayType {
    ...TypeBase
    itemType {
      id
    }
  }
`
export const ArrayTypeWithItemTypeFragmentDoc = gql`
  fragment ArrayTypeWithItemType on ArrayType {
    ...ArrayType
    itemType {
      ... on TypeBase {
        ...TypeBase
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
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
