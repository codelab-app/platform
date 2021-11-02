import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type __UserFragment = {
  id: string
  auth0Id: string
  roles: Array<Types.Role>
}

export const __UserFragmentDoc = gql`
  fragment __User on User {
    id
    auth0Id
    roles
  }
`
