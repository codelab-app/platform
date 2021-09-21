import * as Types from '@codelab/shared/codegen/graphql';

import { TypeEdgeFragment } from './TypeEdge.fragment.web.graphql.gen';
import { Type_ArrayType_Fragment, Type_ComponentType_Fragment, Type_ElementType_Fragment, Type_EnumType_Fragment, Type_InterfaceType_Fragment, Type_LambdaType_Fragment, Type_PrimitiveType_Fragment } from './Type.fragment.web.graphql.gen';
import { gql } from '@apollo/client';
import { TypeEdgeFragmentDoc } from './TypeEdge.fragment.web.graphql.gen';
import { TypeFragmentDoc } from './Type.fragment.web.graphql.gen';
export type TypeGraphFragment = { edges: Array<TypeEdgeFragment>, vertices: Array<Type_ArrayType_Fragment | Type_ComponentType_Fragment | Type_ElementType_Fragment | Type_EnumType_Fragment | Type_InterfaceType_Fragment | Type_LambdaType_Fragment | Type_PrimitiveType_Fragment> };

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