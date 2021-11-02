import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestAppFragment = { id: string; name: string; ownerId: string }

export const TestAppFragmentDoc = gql`
  fragment TestApp on App {
    id
    name
    ownerId
  }
`
