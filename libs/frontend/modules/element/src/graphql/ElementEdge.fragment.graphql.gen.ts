import * as Types from '@codelab/shared/codegen/graphql'

export type ElementEdgeFragment = {
  order?: number | null | undefined
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
