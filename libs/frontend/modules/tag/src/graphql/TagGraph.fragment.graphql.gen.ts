import * as Types from '@codelab/shared/codegen/graphql'

import {
  TagFragment,
  TagEdgeFragment,
} from '../use-cases/Tag.fragment.graphql.gen'
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
