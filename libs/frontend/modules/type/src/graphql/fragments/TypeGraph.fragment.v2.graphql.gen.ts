import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  Field_InterfaceTypeEdge_Fragment,
  Field_InterfaceTypeFieldsRelationship_Fragment,
} from './Field.fragment.v2.graphql.gen'
import {
  TypeNonRecursive_AppType_Fragment,
  TypeNonRecursive_ArrayType_Fragment,
  TypeNonRecursive_ElementType_Fragment,
  TypeNonRecursive_EnumType_Fragment,
  TypeNonRecursive_InterfaceType_Fragment,
  TypeNonRecursive_LambdaType_Fragment,
  TypeNonRecursive_MonacoType_Fragment,
  TypeNonRecursive_PageType_Fragment,
  TypeNonRecursive_PrimitiveType_Fragment,
  TypeNonRecursive_ReactNodeType_Fragment,
  TypeNonRecursive_RenderPropsType_Fragment,
  TypeNonRecursive_UnionType_Fragment,
} from './Type.fragment.v2.graphql.gen'
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
} from './TypeBase.fragment.v2.graphql.gen'
import { ArrayTypeFragment } from './ArrayType.fragment.v2.graphql.gen'
import { EnumTypeFragment } from './EnumType.fragment.v2.graphql.gen'
import { EnumTypeValueFragment } from './EnumTypeValue.fragment.v2.graphql.gen'
import {
  InterfaceTypeFragment,
  InterfaceTypeWithFieldsFragment,
  InterfaceTypeFieldEdgeFragment,
} from './Interface.fragment.v2.graphql.gen'
import { PrimitiveTypeFragment } from './PrimitiveType.fragment.v2.graphql.gen'
import { ElementTypeFragment } from './ElementType.fragment.v2.graphql.gen'
import { LambdaTypeFragment } from './LambdaType.fragment.v2.graphql.gen'
import { RenderPropsTypeFragment } from './RenderProps.fragment.v2.graphql.gen'
import {
  UnionTypeFragment,
  UnionTypeWithInnerTypesFragment,
} from './UnionType.fragment.v2.graphql.gen'
import { MonacoTypeFragment } from './MonacoType.fragment.v2.graphql.gen'
import { PageTypeFragment } from './PageType.fragment.v2.graphql.gen'
import { AppTypeFragment } from './AppType.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { FieldFragmentDoc } from './Field.fragment.v2.graphql.gen'
import { TypeNonRecursiveFragmentDoc } from './Type.fragment.v2.graphql.gen'
import { TypeBaseFragmentDoc } from './TypeBase.fragment.v2.graphql.gen'
import { ArrayTypeFragmentDoc } from './ArrayType.fragment.v2.graphql.gen'
import { EnumTypeFragmentDoc } from './EnumType.fragment.v2.graphql.gen'
import { EnumTypeValueFragmentDoc } from './EnumTypeValue.fragment.v2.graphql.gen'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeWithFieldsFragmentDoc,
  InterfaceTypeFieldEdgeFragmentDoc,
} from './Interface.fragment.v2.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './PrimitiveType.fragment.v2.graphql.gen'
import { ElementTypeFragmentDoc } from './ElementType.fragment.v2.graphql.gen'
import { LambdaTypeFragmentDoc } from './LambdaType.fragment.v2.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './RenderProps.fragment.v2.graphql.gen'
import {
  UnionTypeFragmentDoc,
  UnionTypeWithInnerTypesFragmentDoc,
} from './UnionType.fragment.v2.graphql.gen'
import { MonacoTypeFragmentDoc } from './MonacoType.fragment.v2.graphql.gen'
import { PageTypeFragmentDoc } from './PageType.fragment.v2.graphql.gen'
import { AppTypeFragmentDoc } from './AppType.fragment.v2.graphql.gen'
export type TypeEdge_Edge_Fragment = { source: string; target: string }

export type TypeEdge_InterfaceTypeEdge_Fragment = {
  source: string
  target: string
} & Field_InterfaceTypeEdge_Fragment

export type TypeEdgeFragment =
  | TypeEdge_Edge_Fragment
  | TypeEdge_InterfaceTypeEdge_Fragment

export type TypeGraphFragment = {
  edges: Array<TypeEdge_Edge_Fragment | TypeEdge_InterfaceTypeEdge_Fragment>
  vertices: Array<
    | TypeNonRecursive_AppType_Fragment
    | TypeNonRecursive_ArrayType_Fragment
    | TypeNonRecursive_ElementType_Fragment
    | TypeNonRecursive_EnumType_Fragment
    | TypeNonRecursive_InterfaceType_Fragment
    | TypeNonRecursive_LambdaType_Fragment
    | TypeNonRecursive_MonacoType_Fragment
    | TypeNonRecursive_PageType_Fragment
    | TypeNonRecursive_PrimitiveType_Fragment
    | TypeNonRecursive_RenderPropsType_Fragment
    | TypeNonRecursive_UnionType_Fragment
  >
}

export const TypeEdgeFragmentDoc = gql`
  fragment TypeEdge on TypeEdge {
    ... on InterfaceTypeEdge {
      ...Field
    }
    ... on IEdge {
      source
      target
    }
  }
`
export const TypeGraphFragmentDoc = gql`
  fragment TypeGraph on TypeGraph {
    edges {
      ...TypeEdge
    }
    vertices {
      ...TypeNonRecursive
    }
  }
`
