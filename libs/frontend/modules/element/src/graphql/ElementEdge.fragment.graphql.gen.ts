import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type ElementEdgeFragment = {
  order?: Types.Maybe<number>
  source: string
  target: string
}

export const ElementEdgeFragmentDoc = gql`
  fragment ElementEdge on ElementEdge {
    order
    source
    target
  }
`
