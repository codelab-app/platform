import * as Types from '@codelab/shared/abstract/codegen-v2'

import { TagFragment } from './Tag.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { TagFragmentDoc } from './Tag.fragment.v2.graphql.gen'
export type TagGraphFragment = {
  vertices: Array<{ ' $fragmentRefs': { TagFragment: TagFragment } }>
  edges: Array<{ ' $fragmentRefs': { TagEdgeFragment: TagEdgeFragment } }>
}

export type TagEdgeFragment = { source: string; target: string }

export const TagEdgeFragmentDoc = gql`
  fragment TagEdge on TagEdge {
    source
    target
  }
`
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
