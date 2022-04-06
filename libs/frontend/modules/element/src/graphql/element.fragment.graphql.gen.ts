import * as Types from '@codelab/shared/abstract/codegen'

import { ComponentFragment } from '../../../component/src/graphql/component.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ComponentFragmentDoc } from '../../../component/src/graphql/component.fragment.graphql.gen'
export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null
  css?: string | null
  renderForEachPropKey?: string | null
  renderIfPropKey?: string | null
  propTransformationJs?: string | null
  component?: ComponentFragment | null
  instanceOfComponent?: ComponentFragment | null
  parentElement?: { id: string; name?: string | null } | null
  atom?: {
    id: string
    type: Types.AtomType
    name: string
    tags: Array<{ id: string; name: string }>
    api: { id: string; name: string }
  } | null
  props?: PropFragment | null
  hooks: Array<HookFragment>
  propMapBindings: Array<PropMapBindingFragment>
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
  edges: Array<ElementEdgeFragment>
  vertices: Array<ElementFragment>
}

export type PropFragment = { id: string; data: string }

export type HookPropFragment = { id: string; data: string }

export type HookFragment = {
  id: string
  type: Types.AtomType
  config: HookPropFragment
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
      ...Component
    }
    instanceOfComponent {
      ...Component
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
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
