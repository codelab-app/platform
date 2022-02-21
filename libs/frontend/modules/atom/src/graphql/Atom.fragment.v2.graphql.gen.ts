import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type AtomFragment = {
  __typename: 'Atom'
  id: string
  name: string
  type: Types.AtomType
  tags?: Array<{ id: string; name: string }> | null | undefined
  api: { id: string; name: string }
}

export const AtomFragmentDoc = gql`
  fragment Atom on Atom {
    __typename
    id
    name
    type
    tags {
      id
      name
    }
    api {
      id
      name
    }
  }
`
