import { gql } from '@apollo/client'
import { PageFragmentsGql } from '../../../../page/src/core/domain/Page.fragments.gql'

export const AppFragmentsGql = gql`
  fragment appFragments on App {
    id
    title
    pages {
      ...pageFragments
    }
  }
  ${PageFragmentsGql}
`
