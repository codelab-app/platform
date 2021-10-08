import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestElementEdgeFragment = {
  order?: number | null | undefined
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
