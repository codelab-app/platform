import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type AppFragment = { id: string; ownerId: string; name: string }

export type AppBaseFragment = { id: string; ownerId: string; name: string }

export const AppFragmentDoc = gql`
  fragment App on App {
    id
    ownerId
    name
  }
`
export const AppBaseFragmentDoc = gql`
  fragment AppBase on App {
    id
    ownerId
    name
  }
`
