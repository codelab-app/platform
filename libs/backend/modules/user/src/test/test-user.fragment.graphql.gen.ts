import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestUserFragment = {
  id: string
  auth0Id: string
  roles: Array<Types.Role>
}

export const TestUserFragmentDoc = gql`
  fragment TestUser on User {
    id
    auth0Id
    roles
  }
`
