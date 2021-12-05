import * as Types from '@codelab/frontend/abstract/codegen'

import { TagFragment } from './Tag.fragment.graphql.gen'
import { TagEdgeFragment } from './TagEdge.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TagFragmentDoc } from './Tag.fragment.graphql.gen'
import { TagEdgeFragmentDoc } from './TagEdge.fragment.graphql.gen'
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
