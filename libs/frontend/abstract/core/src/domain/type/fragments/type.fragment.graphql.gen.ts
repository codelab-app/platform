import * as Types from '@codelab/shared/abstract/codegen'

import { ArrayTypeFragment } from './array-type.fragment.graphql.gen'
import { UnionTypeFragment } from './union-type.fragment.graphql.gen'
import { EnumTypeFragment } from './enum-type.fragment.graphql.gen'
import { InterfaceTypeFragment } from './interface.fragment.graphql.gen'
import { PrimitiveTypeFragment } from './primitive-type.fragment.graphql.gen'
import { ElementTypeFragment } from './element-type.fragment.graphql.gen'
import { LambdaTypeFragment } from './lambda-type.fragment.graphql.gen'
import { RenderPropTypeFragment } from './render-prop.fragment.graphql.gen'
import { ReactNodeTypeFragment } from './react-node-type.fragment.graphql.gen'
import { CodeMirrorTypeFragment } from './code-mirror-type.fragment.graphql.gen'
import { PageTypeFragment } from './page-type.fragment.graphql.gen'
import { AppTypeFragment } from './app-type.fragment.graphql.gen'
import { ActionTypeFragment } from './action-type.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ArrayTypeFragmentDoc } from './array-type.fragment.graphql.gen'
import { UnionTypeFragmentDoc } from './union-type.fragment.graphql.gen'
import { EnumTypeFragmentDoc } from './enum-type.fragment.graphql.gen'
import { InterfaceTypeFragmentDoc } from './interface.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './primitive-type.fragment.graphql.gen'
import { ElementTypeFragmentDoc } from './element-type.fragment.graphql.gen'
import { LambdaTypeFragmentDoc } from './lambda-type.fragment.graphql.gen'
import { RenderPropTypeFragmentDoc } from './render-prop.fragment.graphql.gen'
import { ReactNodeTypeFragmentDoc } from './react-node-type.fragment.graphql.gen'
import { CodeMirrorTypeFragmentDoc } from './code-mirror-type.fragment.graphql.gen'
import { PageTypeFragmentDoc } from './page-type.fragment.graphql.gen'
import { AppTypeFragmentDoc } from './app-type.fragment.graphql.gen'
import { ActionTypeFragmentDoc } from './action-type.fragment.graphql.gen'
export type Type_ActionType_Fragment = ActionTypeFragment

export type Type_AppType_Fragment = AppTypeFragment

export type Type_ArrayType_Fragment = ArrayTypeFragment

export type Type_BaseType_Fragment = {}

export type Type_CodeMirrorType_Fragment = CodeMirrorTypeFragment

export type Type_ElementType_Fragment = ElementTypeFragment

export type Type_EnumType_Fragment = EnumTypeFragment

export type Type_InterfaceType_Fragment = InterfaceTypeFragment

export type Type_LambdaType_Fragment = LambdaTypeFragment

export type Type_PageType_Fragment = PageTypeFragment

export type Type_PrimitiveType_Fragment = PrimitiveTypeFragment

export type Type_ReactNodeType_Fragment = ReactNodeTypeFragment

export type Type_RenderPropType_Fragment = RenderPropTypeFragment

export type Type_UnionType_Fragment = UnionTypeFragment

export type TypeFragment =
  | Type_ActionType_Fragment
  | Type_AppType_Fragment
  | Type_ArrayType_Fragment
  | Type_BaseType_Fragment
  | Type_CodeMirrorType_Fragment
  | Type_ElementType_Fragment
  | Type_EnumType_Fragment
  | Type_InterfaceType_Fragment
  | Type_LambdaType_Fragment
  | Type_PageType_Fragment
  | Type_PrimitiveType_Fragment
  | Type_ReactNodeType_Fragment
  | Type_RenderPropType_Fragment
  | Type_UnionType_Fragment

export const TypeFragmentDoc = gql`
  fragment Type on IBaseType {
    ...ArrayType
    ...UnionType
    ...EnumType
    ...InterfaceType
    ...PrimitiveType
    ...ElementType
    ...LambdaType
    ...RenderPropType
    ...ReactNodeType
    ...CodeMirrorType
    ...PageType
    ...AppType
    ...ActionType
  }
  ${ArrayTypeFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropTypeFragmentDoc}
  ${ReactNodeTypeFragmentDoc}
  ${CodeMirrorTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
  ${ActionTypeFragmentDoc}
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
