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
} from './type-base.fragment.graphql.gen'
import { EnumTypeValueFragment } from './enum-type-value.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { BaseTypeFragmentDoc } from './type-base.fragment.graphql.gen'
import { EnumTypeValueFragmentDoc } from './enum-type-value.fragment.graphql.gen'
export type EnumTypeFragment = {
  allowedValues: Array<EnumTypeValueFragment>
} & BaseType_EnumType_Fragment

export const EnumTypeFragmentDoc = gql`
  fragment EnumType on EnumType {
    ...BaseType
    allowedValues {
      ...EnumTypeValue
    }
  }
  ${BaseTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
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
