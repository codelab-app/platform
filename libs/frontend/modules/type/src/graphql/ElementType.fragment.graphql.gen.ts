import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type ElementTypeFragment = {
  id: string
  name: string
  elementKind: Types.ElementTypeKind
}

export const ElementTypeFragmentDoc = gql`
  fragment ElementType on ElementType {
    id
    name
    elementKind
  }
`
