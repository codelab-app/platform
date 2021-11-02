import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestArrayTypeFragment = { id: string; name: string }

export const TestArrayTypeFragmentDoc = gql`
  fragment TestArrayType on ArrayType {
    id
    name
  }
`
