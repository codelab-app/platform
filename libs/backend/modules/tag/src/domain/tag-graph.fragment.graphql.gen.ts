import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagFragment } from './tag.fragment.graphql.gen';
import { TestTagEdgeFragment } from './tag-edge.fragment.graphql.gen';
import { TestTagFragmentDoc } from './tag.fragment.graphql.gen';
import { TestTagEdgeFragmentDoc } from './tag-edge.fragment.graphql.gen';
export type TestTagGraphFragment = { vertices: Array<TestTagFragment>, edges: Array<TestTagEdgeFragment> };

export const TestTagGraphFragmentDoc = `
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