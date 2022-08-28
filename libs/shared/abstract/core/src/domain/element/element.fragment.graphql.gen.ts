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
  component?: ComponentFragment | null
  instanceOfComponent?: ComponentFragment | null
  prevSibling?: { id: string } | null
  nextSibling?: { id: string } | null
  childrenRoot?: { id: string } | null
  atom?: AtomFragment | null
  props?: PropFragment | null
  rootOf?: { id: string } | null
  hooks: Array<HookFragment>
  propMapBindings: Array<PropMapBindingFragment>
}

export type ElementGraphFragment = { id: string; descendants: Array<string> }

export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    id
    name
    customCss
    guiCss
    component {
      ...Component
    }
    instanceOfComponent {
      ...Component
    }
    prevSibling {
      id
    }
    nextSibling {
      id
    }
    childrenRoot {
      id
    }
    atom {
      ...Atom
    }
    props {
      ...Prop
    }
    rootOf {
      id
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
