import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type PageFragment = {
  id: string
  name: string
  rootElement?: { id: string; name: string } | null | undefined
}

export const PageFragmentDoc = gql`
  fragment Page on Page {
    id
    name
    rootElement {
      id
      name
    }
  }
`
