import * as Types from '@codelab/shared/codegen/graphql';

import { TagFragment } from './Tag.fragment.api.graphql.gen';
import { TagEdgeFragment } from './TagEdge.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { TagFragmentDoc } from './Tag.fragment.api.graphql.gen';
import { TagEdgeFragmentDoc } from './TagEdge.fragment.api.graphql.gen';
export type TagGraphFragment = { vertices: Array<TagFragment>, edges: Array<TagEdgeFragment> };

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