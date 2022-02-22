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
import { gql } from '@apollo/client'
import { FieldFragmentDoc } from './Field.fragment.v2.graphql.gen'
import { TypeNonRecursiveFragmentDoc } from './Type.fragment.v2.graphql.gen'
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
  ${FieldFragmentDoc}
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
  ${TypeEdgeFragmentDoc}
  ${TypeNonRecursiveFragmentDoc}
`
