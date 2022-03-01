import * as Types from '@codelab/shared/abstract/codegen-v2'

import { AtomFragment } from '../../../atom/src/graphql/Atom.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { AtomFragmentDoc } from '../../../atom/src/graphql/Atom.fragment.v2.graphql.gen'
export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null
  css?: string | null
  renderForEachPropKey?: string | null
  renderIfPropKey?: string | null
  propTransformationJs?: string | null
  component?: { id: string; name: string } | null
  instanceOfComponent?: { id: string; name: string } | null
  parentElement?: { id: string; name?: string | null } | null
  atom?: { ' $fragmentRefs': { AtomFragment: AtomFragment } } | null
  props?: { ' $fragmentRefs': { PropFragment: PropFragment } } | null
  hooks?: Array<{ ' $fragmentRefs': { HookFragment: HookFragment } }> | null
  propMapBindings?: Array<{
    ' $fragmentRefs': { PropMapBindingFragment: PropMapBindingFragment }
  }> | null
  parentElementConnection: {
    edges: Array<{
      order?: number | null
      node: { id: string; name?: string | null }
    }>
  }
}

export type ElementEdgeFragment = {
  source: string
  target: string
  order?: number | null
}

export type ElementGraphFragment = {
  rootId?: string | null
  edges: Array<{
    ' $fragmentRefs': { ElementEdgeFragment: ElementEdgeFragment }
  }>
  vertices: Array<{ ' $fragmentRefs': { ElementFragment: ElementFragment } }>
}

export type PropFragment = { id: string; data: string }

export type HookFragment = {
  id: string
  type: Types.AtomType
  config: { ' $fragmentRefs': { PropFragment: PropFragment } }
  element: { id: string; name?: string | null }
}

export type PropMapBindingFragment = {
  id: string
  sourceKey: string
  targetKey: string
  element: { id: string; name?: string | null }
  targetElement?: { id: string; name?: string | null } | null
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
    component {
      id
      name
    }
    instanceOfComponent {
      id
      name
    }
    parentElement {
      id
      name
    }
    atom {
      ...Atom
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
