import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestUnionTypeFragment = { id: string; name: string }

export const TestUnionTypeFragmentDoc = gql`
  fragment TestUnionType on UnionType {
    id
    name
  }
`
