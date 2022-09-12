import * as Types from '@codelab/shared/abstract/codegen'

import { ComponentFragment } from '../component/component.fragment.graphql.gen'
import { AtomFragment } from '../atom/atom.fragment.graphql.gen'
import {
  PropFragment,
  PropMapBindingFragment,
} from '../prop/prop.fragment.graphql.gen'
import { HookFragment } from '../hook/hook.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ComponentFragmentDoc } from '../component/component.fragment.graphql.gen'
import { AtomFragmentDoc } from '../atom/atom.fragment.graphql.gen'
import {
  PropFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../prop/prop.fragment.graphql.gen'
import { HookFragmentDoc } from '../hook/hook.fragment.graphql.gen'
export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null
  customCss?: string | null
  guiCss?: string | null
  renderForEachPropKey?: string | null
  renderIfPropKey?: string | null
  preRenderActionId?: string | null
  postRenderActionId?: string | null
  propTransformationJs?: string | null
  componentRenderType?: ComponentFragment | null
  atomRenderType?: AtomFragment | null
  prevSibling?: { id: string } | null
  nextSibling?: { id: string } | null
  parentElement?: { id: string } | null
  parentComponent?: ComponentFragment | null
  parent?: { id: string } | null
  firstChild?: { id: string } | null
  props?: PropFragment | null
  hooks: Array<HookFragment>
  propMapBindings: Array<PropMapBindingFragment>
  parentElementConnection: {
    edges: Array<{ node: { id: string; name?: string | null } }>
  }
}

export type ElementGraphFragment = { id: string; descendants: Array<string> }

export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    id
    name
    customCss
    guiCss
    componentRenderType {
      ...Component
    }
    atomRenderType {
      ...Atom
    }
    prevSibling {
      id
    }
    nextSibling {
      id
    }
    parentElement {
      id
    }
    parentComponent {
      ...Component
    }
    parent {
      id
    }
    firstChild {
      id
    }
    props {
      ...Prop
    }
    hooks {
      ...Hook
    }
    renderForEachPropKey
    renderIfPropKey
    preRenderActionId
    postRenderActionId
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
      }
    }
  }
  ${ComponentFragmentDoc}
  ${AtomFragmentDoc}
  ${PropFragmentDoc}
  ${HookFragmentDoc}
  ${PropMapBindingFragmentDoc}
`
export const ElementGraphFragmentDoc = gql`
  fragment ElementGraph on ElementGraph {
    id
    descendants
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
