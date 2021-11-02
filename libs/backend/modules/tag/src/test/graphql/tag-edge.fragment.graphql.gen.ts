import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestTagEdgeFragment = {
  __typename: 'TagEdge'
  source: string
  target: string
}

export const TestTagEdgeFragmentDoc = gql`
  fragment TestTagEdge on TagEdge {
    __typename
    source
    target
  }
`
