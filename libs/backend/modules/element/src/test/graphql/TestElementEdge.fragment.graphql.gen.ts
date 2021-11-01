import * as Types from '@codelab/shared/codegen/graphql'

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
