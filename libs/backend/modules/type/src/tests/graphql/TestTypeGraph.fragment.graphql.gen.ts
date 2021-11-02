import * as Types from '@codelab/shared/codegen/graphql'

import {
  TestTypeEdge_BaseTypeEdge_Fragment,
  TestTypeEdge_FieldTypeEdge_Fragment,
} from './TestTypeEdge.fragment.graphql.gen'
import {
  TestType_ArrayType_Fragment,
  TestType_ComponentType_Fragment,
  TestType_ElementType_Fragment,
  TestType_EnumType_Fragment,
  TestType_InterfaceType_Fragment,
  TestType_LambdaType_Fragment,
  TestType_PrimitiveType_Fragment,
  TestType_ReactNodeType_Fragment,
  TestType_RenderPropsType_Fragment,
  TestType_UnionType_Fragment,
} from './TestType.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestTypeEdgeFragmentDoc } from './TestTypeEdge.fragment.graphql.gen'
import { TestTypeFragmentDoc } from './TestType.fragment.graphql.gen'
export type TestTypeGraphFragment = {
  edges: Array<
    TestTypeEdge_BaseTypeEdge_Fragment | TestTypeEdge_FieldTypeEdge_Fragment
  >
  vertices: Array<
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
  >
}

export const TestTypeGraphFragmentDoc = gql`
  fragment TestTypeGraph on TypeGraph {
    edges {
      ...TestTypeEdge
    }
    vertices {
      ...TestType
    }
  }
  ${TestTypeEdgeFragmentDoc}
  ${TestTypeFragmentDoc}
`
