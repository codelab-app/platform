import * as Types from '@codelab/frontend/abstract/codegen'

import {
  TagFragment,
  TagEdgeFragment,
  TagGraphFragment,
} from '../use-cases/Tag.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  TagFragmentDoc,
  TagEdgeFragmentDoc,
  TagGraphFragmentDoc,
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
