import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type TestArrayTypeFragment = { id: string; name: string }

export const TestArrayTypeFragmentDoc = gql`
  fragment TestArrayType on ArrayType {
    id
    name
  }
`
