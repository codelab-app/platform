import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type PageTypeFragment = { id: string; name: string }

export const PageTypeFragmentDoc = gql`
  fragment PageType on LambdaType {
    id
    name
  }
`
