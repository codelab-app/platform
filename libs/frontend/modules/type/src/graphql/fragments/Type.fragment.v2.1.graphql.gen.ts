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
import {
  ArrayTypeWithItemTypeFragment,
  ArrayTypeFragment,
} from './ArrayType.fragment.v2.1.graphql.gen'
import { EnumTypeFragment } from './EnumType.fragment.v2.1.graphql.gen'
import { EnumTypeValueFragment } from './EnumTypeValue.fragment.v2.1.graphql.gen'
import {
  InterfaceTypeFragment,
  InterfaceTypeFieldEdgeFragment,
} from './Interface.fragment.v2.1.graphql.gen'
import { PrimitiveTypeFragment } from './PrimitiveType.fragment.v2.1.graphql.gen'
import { ElementTypeFragment } from './ElementType.fragment.v2.1.graphql.gen'
import { LambdaTypeFragment } from './LambdaType.fragment.v2.1.graphql.gen'
import { RenderPropsTypeFragment } from './RenderProps.fragment.v2.1.graphql.gen'
import {
  UnionTypeWithInnerTypesFragment,
  UnionTypeFragment,
} from './UnionType.fragment.v2.1.graphql.gen'
import { MonacoTypeFragment } from './MonacoType.fragment.v2.1.graphql.gen'
import { PageTypeFragment } from './PageType.fragment.v2.1.graphql.gen'
import { AppTypeFragment } from './AppType.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
import { TypeBaseFragmentDoc } from './TypeBase.fragment.v2.1.graphql.gen'
import {
  ArrayTypeWithItemTypeFragmentDoc,
  ArrayTypeFragmentDoc,
} from './ArrayType.fragment.v2.1.graphql.gen'
import { EnumTypeFragmentDoc } from './EnumType.fragment.v2.1.graphql.gen'
import { EnumTypeValueFragmentDoc } from './EnumTypeValue.fragment.v2.1.graphql.gen'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeFieldEdgeFragmentDoc,
} from './Interface.fragment.v2.1.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './PrimitiveType.fragment.v2.1.graphql.gen'
import { ElementTypeFragmentDoc } from './ElementType.fragment.v2.1.graphql.gen'
import { LambdaTypeFragmentDoc } from './LambdaType.fragment.v2.1.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './RenderProps.fragment.v2.1.graphql.gen'
import {
  UnionTypeWithInnerTypesFragmentDoc,
  UnionTypeFragmentDoc,
} from './UnionType.fragment.v2.1.graphql.gen'
import { MonacoTypeFragmentDoc } from './MonacoType.fragment.v2.1.graphql.gen'
import { PageTypeFragmentDoc } from './PageType.fragment.v2.1.graphql.gen'
import { AppTypeFragmentDoc } from './AppType.fragment.v2.1.graphql.gen'
export type Type_AppType_Fragment = TypeBase_AppType_Fragment & AppTypeFragment

export type Type_ArrayType_Fragment = TypeBase_ArrayType_Fragment &
  ArrayTypeWithItemTypeFragment

export type Type_ElementType_Fragment = TypeBase_ElementType_Fragment &
  ElementTypeFragment

export type Type_EnumType_Fragment = TypeBase_EnumType_Fragment &
  EnumTypeFragment

export type Type_InterfaceType_Fragment = TypeBase_InterfaceType_Fragment &
  InterfaceTypeFragment

export type Type_LambdaType_Fragment = TypeBase_LambdaType_Fragment &
  LambdaTypeFragment

export type Type_MonacoType_Fragment = TypeBase_MonacoType_Fragment &
  MonacoTypeFragment

export type Type_PageType_Fragment = TypeBase_PageType_Fragment &
  PageTypeFragment

export type Type_PrimitiveType_Fragment = TypeBase_PrimitiveType_Fragment &
  PrimitiveTypeFragment

export type Type_ReactNodeType_Fragment = TypeBase_ReactNodeType_Fragment

export type Type_RenderPropsType_Fragment = TypeBase_RenderPropsType_Fragment &
  RenderPropsTypeFragment

export type Type_UnionType_Fragment = TypeBase_UnionType_Fragment &
  UnionTypeWithInnerTypesFragment

export type TypeFragment =
  | Type_AppType_Fragment
  | Type_ArrayType_Fragment
  | Type_ElementType_Fragment
  | Type_EnumType_Fragment
  | Type_InterfaceType_Fragment
  | Type_LambdaType_Fragment
  | Type_MonacoType_Fragment
  | Type_PageType_Fragment
  | Type_PrimitiveType_Fragment
  | Type_ReactNodeType_Fragment
  | Type_RenderPropsType_Fragment
  | Type_UnionType_Fragment

export type TypeNonRecursive_AppType_Fragment = TypeBase_AppType_Fragment &
  AppTypeFragment

export type TypeNonRecursive_ArrayType_Fragment = TypeBase_ArrayType_Fragment &
  ArrayTypeFragment

export type TypeNonRecursive_ElementType_Fragment =
  TypeBase_ElementType_Fragment & ElementTypeFragment

export type TypeNonRecursive_EnumType_Fragment = TypeBase_EnumType_Fragment &
  EnumTypeFragment

export type TypeNonRecursive_InterfaceType_Fragment =
  TypeBase_InterfaceType_Fragment & InterfaceTypeFragment

export type TypeNonRecursive_LambdaType_Fragment =
  TypeBase_LambdaType_Fragment & LambdaTypeFragment

export type TypeNonRecursive_MonacoType_Fragment =
  TypeBase_MonacoType_Fragment & MonacoTypeFragment

export type TypeNonRecursive_PageType_Fragment = TypeBase_PageType_Fragment &
  PageTypeFragment

export type TypeNonRecursive_PrimitiveType_Fragment =
  TypeBase_PrimitiveType_Fragment & PrimitiveTypeFragment

export type TypeNonRecursive_ReactNodeType_Fragment =
  TypeBase_ReactNodeType_Fragment

export type TypeNonRecursive_RenderPropsType_Fragment =
  TypeBase_RenderPropsType_Fragment & RenderPropsTypeFragment

export type TypeNonRecursive_UnionType_Fragment = TypeBase_UnionType_Fragment &
  UnionTypeFragment

export type TypeNonRecursiveFragment =
  | TypeNonRecursive_AppType_Fragment
  | TypeNonRecursive_ArrayType_Fragment
  | TypeNonRecursive_ElementType_Fragment
  | TypeNonRecursive_EnumType_Fragment
  | TypeNonRecursive_InterfaceType_Fragment
  | TypeNonRecursive_LambdaType_Fragment
  | TypeNonRecursive_MonacoType_Fragment
  | TypeNonRecursive_PageType_Fragment
  | TypeNonRecursive_PrimitiveType_Fragment
  | TypeNonRecursive_ReactNodeType_Fragment
  | TypeNonRecursive_RenderPropsType_Fragment
  | TypeNonRecursive_UnionType_Fragment

export const TypeFragmentDoc = gql`
  fragment Type on TypeBase {
    ...TypeBase
    ...ArrayTypeWithItemType
    ...EnumType
    ...InterfaceType
    ...PrimitiveType
    ...ElementType
    ...LambdaType
    ...RenderPropsType
    ...UnionTypeWithInnerTypes
    ...MonacoType
    ...PageType
    ...AppType
  }
`
export const TypeNonRecursiveFragmentDoc = gql`
  fragment TypeNonRecursive on TypeBase {
    ...TypeBase
    ...ArrayType
    ...EnumType
    ...InterfaceType
    ...PrimitiveType
    ...ElementType
    ...LambdaType
    ...RenderPropsType
    ...UnionType
    ...MonacoType
    ...PageType
    ...AppType
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
