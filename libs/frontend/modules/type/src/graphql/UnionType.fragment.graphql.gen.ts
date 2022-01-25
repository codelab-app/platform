import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type UnionTypeFragment = {
  id: string
  name: string
  typesOfUnionType: Array<{ id: string }>
}

export const UnionTypeFragmentDoc = gql`
  fragment UnionType on UnionType {
    id
    name
    typesOfUnionType {
      id
    }
  }
`
