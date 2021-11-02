import * as Types from '@codelab/shared/codegen/graphql'

import { ElementFragment } from './Element.fragment.graphql.gen'
import { ElementEdgeFragment } from './ElementEdge.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { ElementFragmentDoc } from './Element.fragment.graphql.gen'
import { ElementEdgeFragmentDoc } from './ElementEdge.fragment.graphql.gen'
export type ElementGraphFragment = {
  vertices: Array<ElementFragment>
  edges: Array<ElementEdgeFragment>
}

export const ElementGraphFragmentDoc = gql`
  fragment ElementGraph on ElementGraph {
    vertices {
      ...Element
    }
    edges {
      ...ElementEdge
    }
  }
  ${ElementFragmentDoc}
  ${ElementEdgeFragmentDoc}
`
