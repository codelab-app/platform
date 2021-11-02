import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestElementTypeFragment = {
  id: string
  name: string
  elementKind: Types.ElementTypeKind
}

export const TestElementTypeFragmentDoc = gql`
  fragment TestElementType on ElementType {
    id
    name
    elementKind
  }
`
