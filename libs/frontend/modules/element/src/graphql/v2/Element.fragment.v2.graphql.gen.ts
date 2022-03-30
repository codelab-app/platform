import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from 'graphql-request'
export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null | undefined
  css?: string | null | undefined
  renderForEachPropKey?: string | null | undefined
  renderIfPropKey?: string | null | undefined
  propTransformationJs?: string | null | undefined
  component?: { id: string; name: string } | null | undefined
  instanceOfComponent?: { id: string; name: string } | null | undefined
  parentElement?:
    | { id: string; name?: string | null | undefined }
    | null
    | undefined
  atom?:
    | {
        id: string
        type: Types.AtomType
        name: string
        tags: Array<{ id: string; name: string }>
        api: { id: string; name: string }
      }
    | null
    | undefined
  props?: PropFragment | null | undefined
  hooks: Array<HookFragment>
  propMapBindings: Array<PropMapBindingFragment>
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
  edges: Array<ElementEdgeFragment>
  vertices: Array<ElementFragment>
}

export type PropFragment = { id: string; data: string }

export type HookPropFragment = { id: string; data: string }

export type HookFragment = {
  id: string
  type: Types.AtomType
  config: HookPropFragment
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
export const HookPropFragmentDoc = gql`
  fragment HookProp on Prop {
    id
    data
  }
`
export const HookFragmentDoc = gql`
  fragment Hook on Hook {
    id
    type
    config {
      ...HookProp
    }
    element {
      id
      name
    }
  }
  ${HookPropFragmentDoc}
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
      id
      type
      name
      tags {
        id
        name
      }
      api {
        id
        name
      }
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
  }
  ${ElementEdgeFragmentDoc}
  ${ElementFragmentDoc}
`
