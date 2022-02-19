import * as Types from '@codelab/shared/abstract/codegen-v2'

import { AtomFragment } from '../../../atom/src/graphql/Atom.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { AtomFragmentDoc } from '../../../atom/src/graphql/Atom.fragment.v2.graphql.gen'
export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null | undefined
  css?: string | null | undefined
  renderForEachPropKey?: string | null | undefined
  renderIfPropKey?: string | null | undefined
  propTransformationJs?: string | null | undefined
  instanceOfComponent?: { id: string } | null | undefined
  parentElement?:
    | { id: string; name?: string | null | undefined }
    | null
    | undefined
<<<<<<< HEAD
  atom?: AtomFragment | null | undefined
=======
  atom?:
    | {
        id: string
        name: string
        type: Types.AtomType
        api: { id: string; name: string }
      }
    | null
    | undefined
>>>>>>> 043f55ce (fix: most of error throwing)
  componentTag?: { id: string; name: string } | null | undefined
  props?: PropFragment | null | undefined
  hooks?: Array<HookFragment> | null | undefined
  propMapBindings?: Array<PropMapBindingFragment> | null | undefined
  parentElementConnection: {
    edges: Array<{
      order?: number | null | undefined
      node: { id: string; name?: string | null | undefined }
    }>
  }
}

export type ElementEdgeFragment = {
  source: string
  target: string
  order?: number | null | undefined
}

export type ElementGraphFragment = {
  rootId?: string | null | undefined
  edges: Array<ElementEdgeFragment>
  vertices: Array<ElementFragment>
}

export type PropFragment = { id: string; data: string }

export type HookFragment = {
  id: string
  type: Types.AtomType
  config: PropFragment
  element: { id: string; name?: string | null | undefined }
}

export type PropMapBindingFragment = {
  id: string
  sourceKey: string
  targetKey: string
  element: { id: string; name?: string | null | undefined }
  targetElement?:
    | { id: string; name?: string | null | undefined }
    | null
    | undefined
}

export const ElementEdgeFragmentDoc = gql`
  fragment ElementEdge on ElementEdge {
    source
    target
    order
  }
`
export const PropFragmentDoc = gql`
  fragment Prop on Prop {
    id
    data
  }
`
export const HookFragmentDoc = gql`
  fragment Hook on Hook {
    id
    type
    config {
      ...Prop
    }
    element {
      id
      name
    }
  }
  ${PropFragmentDoc}
`
export const PropMapBindingFragmentDoc = gql`
  fragment PropMapBinding on PropMapBinding {
    id
    sourceKey
    element {
      id
      name
    }
    targetElement {
      id
      name
    }
    targetKey
  }
`
export const ElementFragmentDoc = gql`
    fragment Element on Element {
  __typename
  id
  name
  css
  instanceOfComponent {
    id
  }
  parentElement {
    id
    name
  }
  atom {
    id
    name
    css
    instanceOfComponent {
      id
    }
    parentElement {
      id
      name
    }
    atom {
<<<<<<< HEAD
      ...Atom
=======
      id
      name
      type
      api {
        id
        name
      }
>>>>>>> 043f55ce (fix: most of error throwing)
    }
    componentTag {
      id
      name
    }
    props {
      ...Prop
    }
    hooks {
      ...Hook
    }
    renderForEachPropKey
    renderIfPropKey
    propMapBindings {
      ...PropMapBinding
    }
    propTransformationJs
    parentElementConnection {
      edges {
        node {
          id
          name
        }
        order
      }
    }
  }
  ${AtomFragmentDoc}
  ${PropFragmentDoc}
  ${HookFragmentDoc}
  ${PropMapBindingFragmentDoc}
`
export const ElementGraphFragmentDoc = gql`
  fragment ElementGraph on ElementGraph {
    edges {
      ...ElementEdge
    }
    vertices {
      ...Element
    }
    rootId
  }
  ${ElementEdgeFragmentDoc}
  ${ElementFragmentDoc}
`
