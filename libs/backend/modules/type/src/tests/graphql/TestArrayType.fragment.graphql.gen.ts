import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestArrayTypeFragment = { id: string; name: string }

export const TestArrayTypeFragmentDoc = gql`
  fragment TestArrayType on ArrayType {
    id
    name
  }
`
