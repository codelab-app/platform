import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type AtomFragment = {
  __typename: 'Atom'
  id: string
  name: string
  type: Types.AtomType
  tags: Array<string>
  api: {
    __typename: 'InterfaceType'
    id: string
    name: string
    owner?: { id: string } | null | undefined
  }
}

export type AtomBaseFragment = {
  id: string
  name: string
  type: Types.AtomType
  tags: Array<string>
  api: {
    id: string
    name: string
    typeKind: Types.TypeKind
    owner?: { id: string } | null | undefined
  }
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
      owner {
        id
      }
    }
    tags
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
      owner {
        id
      }
    }
    tags
  }
`
