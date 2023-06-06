import * as Types from '@codelab/shared/abstract/codegen'

import { AtomFragment } from '../atom/atom.fragment.graphql.gen'
import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { AtomFragmentDoc } from '../atom/atom.fragment.graphql.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
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
  renderComponentType?: { id: string } | null
  renderAtomType?: AtomFragment | null
  renderType?: { id: string; kind: Types.RenderTypeKind } | null
  prevSibling?: { id: string } | null
  nextSibling?: { id: string } | null
  parentComponent?: { id: string } | null
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
      id
    }
    renderAtomType {
      ...Atom
    }
    renderType {
      id
      kind
    }
    prevSibling {
      id
    }
    nextSibling {
      id
    }
    parentComponent {
      id
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
