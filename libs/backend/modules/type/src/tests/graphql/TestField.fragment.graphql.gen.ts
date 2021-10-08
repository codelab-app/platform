import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestFieldFragment = {
  id: string
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export const TestFieldFragmentDoc = gql`
  fragment TestField on Field {
    id
    key
    name
    description
  }
`
