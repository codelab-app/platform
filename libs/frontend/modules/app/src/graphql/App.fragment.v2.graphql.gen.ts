import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type AppFragment = {
  id: string
  name: string
  pages?:
    | Array<{ id: string; name: string } | null | undefined>
    | null
    | undefined
}

export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    pages {
      id
      name
    }
  }
`
