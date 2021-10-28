import * as Types from '@codelab/shared/codegen/graphql';

export type TagGraphFragment = { vertices: Array<TagFragment>, edges: Array<TagEdgeFragment> };

export type TagEdgeFragment = { source: string, target: string };

export type TagFragment = { id: string, name: string };

export const TagFragmentDoc = `
    fragment Tag on Tag {
  id
  name
}
    `;
export const TagEdgeFragmentDoc = `
    fragment TagEdge on TagEdge {
  source
  target
}
    `;
export const TagGraphFragmentDoc = `
    fragment TagGraph on TagGraph {
  vertices {
    ...Tag
  }
  edges {
    ...TagEdge
  }
}
    ${TagFragmentDoc}
${TagEdgeFragmentDoc}`;