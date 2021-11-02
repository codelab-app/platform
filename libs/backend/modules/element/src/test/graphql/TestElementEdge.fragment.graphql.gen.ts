import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestElementEdgeFragment = {
  order?: Types.Maybe<number>
  source: string
  target: string
}

export const TestElementEdgeFragmentDoc = gql`
  fragment TestElementEdge on ElementEdge {
    order
    source
    target
  }
`
