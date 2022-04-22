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
  css?: string | null
  renderForEachPropKey?: string | null
  renderIfPropKey?: string | null
  propTransformationJs?: string | null
  component?: ComponentFragment | null
  instanceOfComponent?: ComponentFragment | null
  parentElement?: { id: string } | null
  atom?: AtomFragment | null
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

export type ElementGraphFragment = { id: string; descendants: Array<string> }

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
