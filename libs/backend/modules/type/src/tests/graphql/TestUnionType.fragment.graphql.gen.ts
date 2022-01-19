import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type TestUnionTypeFragment = { id: string; name: string }

export const TestUnionTypeFragmentDoc = gql`
  fragment TestUnionType on UnionType {
    id
    name
  }
`
