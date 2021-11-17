import * as Types from '@codelab/frontend/abstract/codegen'

import { TypeGraphFragment } from '../../type/src/graphql/TypeGraph.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TypeGraphFragmentDoc } from '../../type/src/graphql/TypeGraph.fragment.graphql.gen'
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

export type Export__AtomsFragment = {
  id: string
  name: string
  type: Types.AtomType
  api: {
    id: string
    name: string
    typeKind: Types.TypeKind
    typeGraph: TypeGraphFragment
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
export const Export__AtomsFragmentDoc = gql`
  fragment Export__Atoms on Atom {
    id
    name
    type
    api {
      id
      name
      typeKind
      typeGraph {
        ...TypeGraph
      }
    }
  }
  ${TypeGraphFragmentDoc}
`
