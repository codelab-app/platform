import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type AtomFragment = {
  __typename: 'Atom'
  id: string
  name: string
  type: Types.AtomType
  api: { __typename: 'InterfaceType'; id: string; name: string }
}

export type AtomBaseFragment = {
  id: string
  name: string
  type: Types.AtomType
  api: { id: string; name: string; typeKind: Types.TypeKind }
}

export const AtomFragmentDoc = gql`
  fragment Atom on Atom {
    __typename
    id
    name
    type
    api {
      __typename
      id
      name
    }
  }
`
export const AtomBaseFragmentDoc = gql`
  fragment AtomBase on Atom {
    id
    name
    type
    api {
      id
      name
      typeKind
    }
  }
`
