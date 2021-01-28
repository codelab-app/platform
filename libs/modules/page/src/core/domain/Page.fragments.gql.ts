import { gql } from '@apollo/client'
import { GraphFragmentsGql } from '../../../../graph/src/core/domain/graph/Graph.fragments.gql'

export const PageFragmentsGql = gql`
  fragment pageFragments on Page {
    id
    title
    graphs {
      ...graphFragments
    }
  }
  ${GraphFragmentsGql}
`
