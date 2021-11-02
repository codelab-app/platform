import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type UnionTypeFragment = {
  id: string
  name: string
  typeIdsOfUnionType: Array<string>
}

export const UnionTypeFragmentDoc = gql`
  fragment UnionType on UnionType {
    id
    name
    typeIdsOfUnionType
  }
`
