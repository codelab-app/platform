import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type AppFragment = {
  id: string
  name: string
  pages?: Array<{
    id: string
    name: string
    rootElement: { id: string; name?: string | null }
  }> | null
}

export type AppBaseFragment = { id: string; name: string }

export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    pages {
      id
      name
      rootElement {
        id
        name
      }
    }
  }
`
export const AppBaseFragmentDoc = gql`
  fragment AppBase on App {
    id
    name
  }
`
