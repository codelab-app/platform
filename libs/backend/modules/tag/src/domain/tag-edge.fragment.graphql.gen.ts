import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type TestTagEdgeFragment = { source: string, target: string };

export const TestTagEdgeFragmentDoc = gql`
    fragment TestTagEdge on TagEdge {
  source
  target
}
    `;