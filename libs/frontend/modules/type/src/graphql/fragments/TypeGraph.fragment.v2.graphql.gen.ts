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
} & {
  ' $fragmentRefs': {
    Field_InterfaceTypeEdge_Fragment: Field_InterfaceTypeEdge_Fragment
  }
}

export type TypeEdgeFragment =
  | TypeEdge_Edge_Fragment
  | TypeEdge_InterfaceTypeEdge_Fragment

export type TypeGraphFragment = {
  edges: Array<
    | { ' $fragmentRefs': { TypeEdge_Edge_Fragment: TypeEdge_Edge_Fragment } }
    | {
        ' $fragmentRefs': {
          TypeEdge_InterfaceTypeEdge_Fragment: TypeEdge_InterfaceTypeEdge_Fragment
        }
      }
  >
  vertices: Array<
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_AppType_Fragment: TypeNonRecursive_AppType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_ArrayType_Fragment: TypeNonRecursive_ArrayType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_ElementType_Fragment: TypeNonRecursive_ElementType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_EnumType_Fragment: TypeNonRecursive_EnumType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_InterfaceType_Fragment: TypeNonRecursive_InterfaceType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_LambdaType_Fragment: TypeNonRecursive_LambdaType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_MonacoType_Fragment: TypeNonRecursive_MonacoType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_PageType_Fragment: TypeNonRecursive_PageType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_PrimitiveType_Fragment: TypeNonRecursive_PrimitiveType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_RenderPropsType_Fragment: TypeNonRecursive_RenderPropsType_Fragment
        }
      }
    | {
        ' $fragmentRefs': {
          TypeNonRecursive_UnionType_Fragment: TypeNonRecursive_UnionType_Fragment
        }
      }
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
