import { gql } from '@apollo/client'
import { AppFragmentsGql } from '../../../../app/src/core/domain/App.fragments.gql'

export const UserFragmentsGql = gql`
  fragment userFragments on User {
    id
    email
    apps {
      ...appFragments
    }
  }
  ${AppFragmentsGql}
`
