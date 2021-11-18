import * as Types from '@codelab/frontend/abstract/codegen'

import {
  AtomBaseFragment,
  AtomFragment,
} from '../../../atom/src/Atom.fragment.graphql.gen'
import { TagFragment } from '../../../tag/src/Tag.fragment.graphql.gen'
import {
  HookConfig_GraphqlHookConfig_Fragment,
  HookConfig_QueryHookConfig_Fragment,
  HookConfig_QueryPageHookConfig_Fragment,
  HookConfig_QueryPagesHookConfig_Fragment,
  HookConfig_RecoilStateHookConfig_Fragment,
} from './HookConfig.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  AtomBaseFragmentDoc,
  AtomFragmentDoc,
} from '../../../atom/src/Atom.fragment.graphql.gen'
import { TagFragmentDoc } from '../../../tag/src/Tag.fragment.graphql.gen'
import { HookConfigFragmentDoc } from './HookConfig.fragment.graphql.gen'
export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null | undefined
  css?: string | null | undefined
  props: string
  renderForEachPropKey?: string | null | undefined
  renderIfPropKey?: string | null | undefined
  propTransformationJs?: string | null | undefined
  atom?: AtomBaseFragment | null | undefined
  componentTag?: TagFragment | null | undefined
  hooks: Array<HookFragment>
  propMapBindings: Array<PropMapBindingFragment>
}

export type PropMapBindingFragment = {
  id: string
  sourceKey: string
  targetElementId?: string | null | undefined
  targetKey: string
}

export type ElementEdgeFragment = {
  order?: number | null | undefined
  source: string
  target: string
}

export type ElementGraphFragment = {
  vertices: Array<ElementFragment>
  edges: Array<ElementEdgeFragment>
}

export type HookFragment = {
  id: string
  type: Types.HookType
  config:
    | HookConfig_GraphqlHookConfig_Fragment
    | HookConfig_QueryHookConfig_Fragment
    | HookConfig_QueryPageHookConfig_Fragment
    | HookConfig_QueryPagesHookConfig_Fragment
    | HookConfig_RecoilStateHookConfig_Fragment
}

export const HookFragmentDoc = gql`
  fragment Hook on Hook {
    id
    type
    config {
      ...HookConfig
    }
  }
  ${HookConfigFragmentDoc}
`
export const PropMapBindingFragmentDoc = gql`
  fragment PropMapBinding on PropMapBinding {
    id
    sourceKey
    targetElementId
    targetKey
  }
`
export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    id
    name
    css
    atom {
      ...AtomBase
    }
    componentTag {
      ...Tag
    }
    props
    hooks {
      ...Hook
    }
    renderForEachPropKey
    renderIfPropKey
    propMapBindings {
      ...PropMapBinding
    }
    propTransformationJs
  }
  ${AtomBaseFragmentDoc}
  ${TagFragmentDoc}
  ${HookFragmentDoc}
  ${PropMapBindingFragmentDoc}
`
export const ElementEdgeFragmentDoc = gql`
  fragment ElementEdge on ElementEdge {
    order
    source
    target
  }
`
export const ElementGraphFragmentDoc = gql`
  fragment ElementGraph on ElementGraph {
    vertices {
      ...Element
    }
    edges {
      ...ElementEdge
    }
  }
  ${ElementFragmentDoc}
  ${ElementEdgeFragmentDoc}
`
