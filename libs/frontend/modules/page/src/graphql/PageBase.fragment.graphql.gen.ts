import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type PageBaseFragment = {
  id: string
  name: string
  rootElementId: string
}

export const PageBaseFragmentDoc = gql`
  fragment PageBase on Page {
    id
    name
    rootElementId
  }
`
