import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type PrimitiveTypeFragment = {
  id: string
  name: string
  primitiveKind: Types.PrimitiveTypeKind
}

export const PrimitiveTypeFragmentDoc = gql`
  fragment PrimitiveType on PrimitiveType {
    id
    name
    primitiveKind
  }
`
