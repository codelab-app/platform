import * as Types from '@codelab/shared/codegen/graphql';

import { TypeEdgeFragment } from './TypeEdge.fragment.graphql.gen';
import { Type_ArrayType_Fragment, Type_ComponentType_Fragment, Type_ElementType_Fragment, Type_EnumType_Fragment, Type_InterfaceType_Fragment, Type_LambdaType_Fragment, Type_PrimitiveType_Fragment, Type_ReactNodeType_Fragment, Type_RenderPropsType_Fragment, Type_UnionType_Fragment } from './Type.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TypeEdgeFragmentDoc } from './TypeEdge.fragment.graphql.gen';
import { TypeFragmentDoc } from './Type.fragment.graphql.gen';
export type TypeGraphFragment = { edges: Array<TypeEdgeFragment>, vertices: Array<Type_ArrayType_Fragment | Type_ComponentType_Fragment | Type_ElementType_Fragment | Type_EnumType_Fragment | Type_InterfaceType_Fragment | Type_LambdaType_Fragment | Type_PrimitiveType_Fragment | Type_ReactNodeType_Fragment | Type_RenderPropsType_Fragment | Type_UnionType_Fragment> };

export const TypeGraphFragmentDoc = gql`
    fragment TypeGraph on TypeGraph {
  edges {
    ...TypeEdge
  }
  vertices {
    ...Type
  }
}
    ${TypeEdgeFragmentDoc}
${TypeFragmentDoc}`;