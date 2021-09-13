import * as Types from '@codelab/shared/codegen/graphql';

import { ElementFragment } from './Element.fragment.api.graphql.gen';
import { ElementEdgeFragment } from './ElementEdge.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { ElementFragmentDoc } from './Element.fragment.api.graphql.gen';
import { ElementEdgeFragmentDoc } from './ElementEdge.fragment.api.graphql.gen';
export type ComponentVertexFragment = { __typename: 'Component', id: string, name: string };

export type ElementGraphFragment = { vertices: Array<ComponentVertexFragment | ElementFragment>, edges: Array<ElementEdgeFragment> };

export const ComponentVertexFragmentDoc = gql`
    fragment ComponentVertex on Component {
  __typename
  id
  name
}
    `;
export const ElementGraphFragmentDoc = gql`
    fragment ElementGraph on ElementGraph {
  vertices {
    ...ComponentVertex
    ...Element
  }
  edges {
    ...ElementEdge
  }
}
    ${ComponentVertexFragmentDoc}
${ElementFragmentDoc}
${ElementEdgeFragmentDoc}`;