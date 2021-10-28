import * as Types from '@codelab/shared/codegen/graphql';

export type TagEdgeFragment = { source: string, target: string };

export const TagEdgeFragmentDoc = `
    fragment TagEdge on TagEdge {
  source
  target
}
    `;