import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type ElementBaseFragment = {
  __typename: 'Element'
  id: string
  name?: string | null | undefined
  css?: string | null | undefined
  props?: string | null | undefined
  hooks?: Array<string> | null | undefined
  renderForEachPropKey?: string | null | undefined
  renderIfPropKey?: string | null | undefined
  propTransformationJs?: string | null | undefined
  instanceOfComponent?: { id: string } | null | undefined
  parentElement?:
    | { id: string; name?: string | null | undefined }
    | null
    | undefined
  children?:
    | Array<{ id: string; name?: string | null | undefined }>
    | null
    | undefined
  atom?: { id: string; name: string; type: Types.AtomType } | null | undefined
  componentTag?: { id: string; name: string } | null | undefined
  propMapBindings?:
    | Array<{ id: string; sourceKey: string; targetKey: string }>
    | null
    | undefined
}

export type ElementFragment = {
  parentElementConnection: { edges: Array<{ order: number }> }
} & ElementBaseFragment

export type ElementEdgeFragment = {
  source: string
  target: string
  order: number
}

export type ElementGraphFragment = {
  edges: Array<ElementEdgeFragment>
  vertices: Array<ElementBaseFragment>
}

export type ElementWithGraphFragment = {
  graph?: ElementGraphFragment | null | undefined
} & ElementFragment

export const ElementBaseFragmentDoc = gql`
  fragment ElementBase on Element {
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
    children {
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
    props
    hooks
    renderForEachPropKey
    renderIfPropKey
    propMapBindings {
      id
      sourceKey
      targetKey
    }
    propTransformationJs
  }
`
export const ElementFragmentDoc = gql`
  fragment Element on Element {
    ...ElementBase
    parentElementConnection {
      edges {
        order
      }
    }
  }
  ${ElementBaseFragmentDoc}
`
export const ElementEdgeFragmentDoc = gql`
  fragment ElementEdge on ElementEdge {
    source
    target
    order
  }
`
export const ElementGraphFragmentDoc = gql`
  fragment ElementGraph on ElementGraph {
    edges {
      ...ElementEdge
    }
    vertices {
      ...ElementBase
    }
  }
  ${ElementEdgeFragmentDoc}
  ${ElementBaseFragmentDoc}
`
export const ElementWithGraphFragmentDoc = gql`
  fragment ElementWithGraph on Element {
    ...Element
    graph {
      ...ElementGraph
    }
  }
  ${ElementFragmentDoc}
  ${ElementGraphFragmentDoc}
`
