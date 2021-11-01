import * as Types from '@codelab/shared/codegen/graphql'

export type TestAtomFragment = {
  __typename: 'Atom'
  id: string
  name: string
  type: Types.AtomType
  api: { __typename: 'InterfaceType'; id: string; name: string }
}

export type TestAtomBaseFragment = {
  id: string
  name: string
  type: Types.AtomType
  api: { id: string; name: string }
}

export const TestAtomFragmentDoc = gql`
  fragment TestAtom on Atom {
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
export const TestAtomBaseFragmentDoc = gql`
  fragment TestAtomBase on Atom {
    id
    name
    type
    api {
      id
      name
    }
  }
`
