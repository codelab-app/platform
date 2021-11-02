import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestFieldFragment = {
  id: string
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
  source: string
  target: string
}

export const TestFieldFragmentDoc = gql`
  fragment TestField on Field {
    id
    key
    name
    description
    source
    target
  }
`
