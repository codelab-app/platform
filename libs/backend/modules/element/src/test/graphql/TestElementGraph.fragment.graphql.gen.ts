import * as Types from '@codelab/shared/codegen/graphql'

import { TestElementFragment } from './TestElement.fragment.graphql.gen'
import { TestElementEdgeFragment } from './TestElementEdge.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestElementFragmentDoc } from './TestElement.fragment.graphql.gen'
import { TestElementEdgeFragmentDoc } from './TestElementEdge.fragment.graphql.gen'
export type TestElementGraphFragment = {
  vertices: Array<TestElementFragment>
  edges: Array<TestElementEdgeFragment>
}

export const TestElementGraphFragmentDoc = gql`
  fragment TestElementGraph on ElementGraph {
    vertices {
      ...TestElement
    }
    edges {
      ...TestElementEdge
    }
  }
  ${TestElementFragmentDoc}
  ${TestElementEdgeFragmentDoc}
`
