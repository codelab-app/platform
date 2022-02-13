import * as Types from '@codelab/shared/abstract/codegen-v2'

import { TagFragment } from './Tag.fragment.v2.graphql.gen'
import { TagEdgeFragment } from './TagEdge.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { TagFragmentDoc } from './Tag.fragment.v2.graphql.gen'
import { TagEdgeFragmentDoc } from './TagEdge.fragment.v2.graphql.gen'
export type TagGraphFragment = {
  vertices: Array<TagFragment>
  edges: Array<TagEdgeFragment>
}

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
  ${TagEdgeFragmentDoc}
`
