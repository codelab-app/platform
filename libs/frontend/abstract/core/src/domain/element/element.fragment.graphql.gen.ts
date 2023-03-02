import * as Types from '@codelab/shared/abstract/codegen'

import { ComponentFragment } from '../component/component.fragment.graphql.gen'
import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import { AtomFragment } from '../atom/atom.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ComponentFragmentDoc } from '../component/component.fragment.graphql.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
import { AtomFragmentDoc } from '../atom/atom.fragment.graphql.gen'
export type ElementFragment = {
  __typename: 'Element'
  id: string
  name: string
  customCss?: string | null
  guiCss?: string | null
  renderForEachPropKey?: string | null
  renderIfExpression?: string | null
  propTransformationJs?: string | null
  page?: { id: string } | null
  renderComponentType?: ComponentFragment | null
  renderAtomType?: AtomFragment | null
  renderType?: { id: string; model: Types.RenderTypeModel } | null
  prevSibling?: { id: string } | null
  nextSibling?: { id: string } | null
  parentComponent?: ComponentFragment | null
  parent?: { id: string } | null
  firstChild?: { id: string } | null
  props: PropFragment
  preRenderAction?: { id: string } | { id: string } | null
  postRenderAction?: { id: string } | { id: string } | null
}

export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    id
    name
    customCss
    guiCss
    page {
      id
    }
    renderComponentType {
      ...Component
    }
    renderAtomType {
      ...Atom
    }
    renderType {
      id
      model
    }
    prevSibling {
      id
    }
    nextSibling {
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
    renderForEachPropKey
    renderIfExpression
    preRenderAction {
      id
    }
    postRenderAction {
      id
    }
    propTransformationJs
  }
  ${ComponentFragmentDoc}
  ${AtomFragmentDoc}
  ${PropFragmentDoc}
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
