import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type TagGraphFragment = { vertices: Array<TagFragment>, edges: Array<TagEdgeFragment> };

export type TagFragment = { id: string, name: string };

export type TagEdgeFragment = { source: string, target: string };

export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  id
  name
}
    `;
export const TagEdgeFragmentDoc = gql`
    fragment TagEdge on TagEdge {
  source
  target
}
    `;
export const TagGraphFragmentDoc = gql`
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