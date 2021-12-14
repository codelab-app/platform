import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type AppFragment = {
  id: string
  ownerId: string
  name: string
  pages: Array<{ id: string; name: string; rootElementId: string }>
}

export type AppBaseFragment = { id: string; ownerId: string; name: string }

export const AppFragmentDoc = gql`
  fragment App on App {
    id
    ownerId
    name
    pages {
      id
      name
      rootElementId
    }
  }
`
export const AppBaseFragmentDoc = gql`
  fragment AppBase on App {
    id
    ownerId
    name
  }
`
