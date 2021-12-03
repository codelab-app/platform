import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestHookFragment = {
  id: string
  type: Types.AtomType
  config: { data: string }
}

export const TestHookFragmentDoc = gql`
  fragment TestHook on Hook {
    id
    type
    config {
      data
    }
  }
`
