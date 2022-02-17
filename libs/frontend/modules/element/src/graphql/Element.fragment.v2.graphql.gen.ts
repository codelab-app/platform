import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
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
  atom?: { id: string; name: string; type: Types.AtomType } | null | undefined
  componentTag?: { id: string; name: string } | null | undefined
  props?: PropFragment | null | undefined
  hooks?: Array<HookFragment> | null | undefined
  propMapBindings?:
    | Array<{ id: string; sourceKey: string; targetKey: string }>
    | null
    | undefined
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
  }
  ${PropFragmentDoc}
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
      type
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
      id
      sourceKey
      targetKey
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
