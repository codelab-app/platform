import * as Types from '@codelab/shared/codegen/graphql';

export type TestTagEdgeFragment = { __typename: 'TagEdge', source: string, target: string };

export const TestTagEdgeFragmentDoc = `
    fragment TestTagEdge on TagEdge {
  __typename
  source
  target
}
    `;