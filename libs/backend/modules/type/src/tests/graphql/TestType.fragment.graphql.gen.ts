import * as Types from '@codelab/frontend/abstract/codegen'

import { TestArrayTypeFragment } from './TestArrayType.fragment.graphql.gen'
import { TestEnumTypeFragment } from './TestEnumType.fragment.graphql.gen'
import { TestInterfaceFragment } from './TestInterface.fragment.graphql.gen'
import { TestPrimitiveTypeFragment } from './TestPrimitiveType.fragment.graphql.gen'
import { TestElementTypeFragment } from './TestElementType.fragment.graphql.gen'
import { TestLambdaTypeFragment } from './TestLambdaType.fragment.graphql.gen'
import { TestComponentTypeFragment } from './TestComponentType.fragment.graphql.gen'
import { TestRenderPropsTypeFragment } from './TestRenderProps.fragment.graphql.gen'
import { TestUnionTypeFragment } from './TestUnionType.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestArrayTypeFragmentDoc } from './TestArrayType.fragment.graphql.gen'
import { TestEnumTypeFragmentDoc } from './TestEnumType.fragment.graphql.gen'
import { TestInterfaceFragmentDoc } from './TestInterface.fragment.graphql.gen'
import { TestPrimitiveTypeFragmentDoc } from './TestPrimitiveType.fragment.graphql.gen'
import { TestElementTypeFragmentDoc } from './TestElementType.fragment.graphql.gen'
import { TestLambdaTypeFragmentDoc } from './TestLambdaType.fragment.graphql.gen'
import { TestComponentTypeFragmentDoc } from './TestComponentType.fragment.graphql.gen'
import { TestRenderPropsTypeFragmentDoc } from './TestRenderProps.fragment.graphql.gen'
import { TestUnionTypeFragmentDoc } from './TestUnionType.fragment.graphql.gen'
export type TestType_ArrayType_Fragment = {
  __typename: 'ArrayType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestArrayTypeFragment

export type TestType_ComponentType_Fragment = {
  __typename: 'ComponentType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestComponentTypeFragment

export type TestType_ElementType_Fragment = {
  __typename: 'ElementType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestElementTypeFragment

export type TestType_EnumType_Fragment = {
  __typename: 'EnumType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestEnumTypeFragment

export type TestType_InterfaceType_Fragment = {
  __typename: 'InterfaceType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestInterfaceFragment

export type TestType_LambdaType_Fragment = {
  __typename: 'LambdaType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestLambdaTypeFragment

export type TestType_PrimitiveType_Fragment = {
  __typename: 'PrimitiveType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestPrimitiveTypeFragment

export type TestType_ReactNodeType_Fragment = {
  __typename: 'ReactNodeType'
  id: string
  name: string
  typeKind: Types.TypeKind
}

export type TestType_RenderPropsType_Fragment = {
  __typename: 'RenderPropsType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestRenderPropsTypeFragment

export type TestType_UnionType_Fragment = {
  __typename: 'UnionType'
  id: string
  name: string
  typeKind: Types.TypeKind
} & TestUnionTypeFragment

export type TestTypeFragment =
  | TestType_ArrayType_Fragment
  | TestType_ComponentType_Fragment
  | TestType_ElementType_Fragment
  | TestType_EnumType_Fragment
  | TestType_InterfaceType_Fragment
  | TestType_LambdaType_Fragment
  | TestType_PrimitiveType_Fragment
  | TestType_ReactNodeType_Fragment
  | TestType_RenderPropsType_Fragment
  | TestType_UnionType_Fragment

export const TestTypeFragmentDoc = gql`
  fragment TestType on Type {
    __typename
    id
    name
    typeKind
    ...TestArrayType
    ...TestEnumType
    ...TestInterface
    ...TestPrimitiveType
    ...TestElementType
    ...TestLambdaType
    ...TestComponentType
    ...TestRenderPropsType
    ...TestUnionType
  }
  ${TestArrayTypeFragmentDoc}
  ${TestEnumTypeFragmentDoc}
  ${TestInterfaceFragmentDoc}
  ${TestPrimitiveTypeFragmentDoc}
  ${TestElementTypeFragmentDoc}
  ${TestLambdaTypeFragmentDoc}
  ${TestComponentTypeFragmentDoc}
  ${TestRenderPropsTypeFragmentDoc}
  ${TestUnionTypeFragmentDoc}
`
