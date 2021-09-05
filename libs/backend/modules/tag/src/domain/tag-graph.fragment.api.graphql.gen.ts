import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagFragment } from './tag.fragment.api.graphql.gen';
import { TestTagEdgeFragment } from './tag-edge.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { TestTagFragmentDoc } from './tag.fragment.api.graphql.gen';
import { TestTagEdgeFragmentDoc } from './tag-edge.fragment.api.graphql.gen';
export type TestTagGraphFragment = { vertices: Array<TestTagFragment>, edges: Array<TestTagEdgeFragment> };

export const TestTagGraphFragmentDoc = gql`
    fragment TestTagGraph on TagGraph {
  vertices {
    ...TestTag
  }
  edges {
    ...TestTagEdge
  }
}
    ${TestTagFragmentDoc}
${TestTagEdgeFragmentDoc}`;