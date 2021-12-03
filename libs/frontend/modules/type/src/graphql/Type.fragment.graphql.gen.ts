import * as Types from '@codelab/frontend/abstract/codegen'

import { ArrayTypeFragment } from './ArrayType.fragment.graphql.gen'
import { EnumTypeFragment } from './EnumType.fragment.graphql.gen'
import { InterfaceFragment } from './Interface.fragment.graphql.gen'
import { PrimitiveTypeFragment } from './PrimitiveType.fragment.graphql.gen'
import { ElementTypeFragment } from './ElementType.fragment.graphql.gen'
import { LambdaTypeFragment } from './LambdaType.fragment.graphql.gen'
import { ComponentTypeFragment } from './ComponentType.fragment.graphql.gen'
import { RenderPropsTypeFragment } from './RenderProps.fragment.graphql.gen'
import { UnionTypeFragment } from './UnionType.fragment.graphql.gen'
import { MonacoTypeFragment } from './MonacoType.fragment.graphql.gen'
import { PageTypeFragment } from './PageType.fragment.graphql.gen'
import { AppTypeFragment } from './AppType.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { ArrayTypeFragmentDoc } from './ArrayType.fragment.graphql.gen'
import { EnumTypeFragmentDoc } from './EnumType.fragment.graphql.gen'
import { InterfaceFragmentDoc } from './Interface.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './PrimitiveType.fragment.graphql.gen'
import { ElementTypeFragmentDoc } from './ElementType.fragment.graphql.gen'
import { LambdaTypeFragmentDoc } from './LambdaType.fragment.graphql.gen'
import { ComponentTypeFragmentDoc } from './ComponentType.fragment.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './RenderProps.fragment.graphql.gen'
import { UnionTypeFragmentDoc } from './UnionType.fragment.graphql.gen'
import { MonacoTypeFragmentDoc } from './MonacoType.fragment.graphql.gen'
import { PageTypeFragmentDoc } from './PageType.fragment.graphql.gen'
import { AppTypeFragmentDoc } from './AppType.fragment.graphql.gen'
export type Type_AppType_Fragment = {
  __typename: 'AppType'
  id: string
  name: string
  typeKind: Types.TypeKind
}

export type Type_ArrayType_Fragment = {
  __typename: 'ArrayType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & ArrayTypeFragment

export type Type_ComponentType_Fragment = {
  __typename: 'ComponentType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & ComponentTypeFragment

export type Type_ElementType_Fragment = {
  __typename: 'ElementType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & ElementTypeFragment

export type Type_EnumType_Fragment = {
  __typename: 'EnumType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & EnumTypeFragment

export type Type_InterfaceType_Fragment = {
  __typename: 'InterfaceType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & InterfaceFragment

export type Type_LambdaType_Fragment = {
  __typename: 'LambdaType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & LambdaTypeFragment &
  PageTypeFragment &
  AppTypeFragment

export type Type_MonacoType_Fragment = {
  __typename: 'MonacoType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & MonacoTypeFragment

export type Type_PageType_Fragment = {
  __typename: 'PageType'
  id: string
  name: string
  typeKind: Types.TypeKind
}

export type Type_PrimitiveType_Fragment = {
  __typename: 'PrimitiveType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & PrimitiveTypeFragment

export type Type_ReactNodeType_Fragment = {
  __typename: 'ReactNodeType'
  id: string
  name: string
  typeKind: Types.TypeKind
}

export type Type_RenderPropsType_Fragment = {
  __typename: 'RenderPropsType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & RenderPropsTypeFragment

export type Type_UnionType_Fragment = {
  __typename: 'UnionType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & UnionTypeFragment

export type TypeFragment =
  | Type_AppType_Fragment
  | Type_ArrayType_Fragment
  | Type_ComponentType_Fragment
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

export const TypeFragmentDoc = gql`
  fragment Type on Type {
    __typename
    id
    name
    typeKind
    ...ArrayType
    ...EnumType
    ...Interface
    ...PrimitiveType
    ...ElementType
    ...LambdaType
    ...ComponentType
    ...RenderPropsType
    ...UnionType
    ...MonacoType
    ...PageType
    ...AppType
  }
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${InterfaceFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${ComponentTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
