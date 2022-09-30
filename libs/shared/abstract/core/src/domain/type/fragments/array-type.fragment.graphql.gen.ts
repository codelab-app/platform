import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseType_ActionType_Fragment,
  BaseType_AppType_Fragment,
  BaseType_ArrayType_Fragment,
  BaseType_BaseType_Fragment,
  BaseType_CodeMirrorType_Fragment,
  BaseType_ElementType_Fragment,
  BaseType_EnumType_Fragment,
  BaseType_InterfaceType_Fragment,
  BaseType_LambdaType_Fragment,
  BaseType_PageType_Fragment,
  BaseType_PrimitiveType_Fragment,
  BaseType_ReactNodeType_Fragment,
  BaseType_RenderPropsType_Fragment,
  BaseType_UnionType_Fragment,
} from './base-type.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { BaseTypeFragmentDoc } from './base-type.fragment.graphql.gen'
export type ArrayTypeFragment = {
  itemType:
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
    | { id: string; name: string }
} & BaseType_ArrayType_Fragment

export const ArrayTypeFragmentDoc = gql`
  fragment ArrayType on ArrayType {
    ...BaseType
    itemType {
      ... on IBaseType {
        id
        name
      }
    }
  }
  ${BaseTypeFragmentDoc}
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
