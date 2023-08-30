import * as Types from '@codelab/shared/abstract/codegen'

import {
  AtomFragment,
  ProductionAtomFragment,
} from '../atom/atom.fragment.graphql.gen'
import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import {
  AtomFragmentDoc,
  ProductionAtomFragmentDoc,
} from '../atom/atom.fragment.graphql.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
export type ContainerNode_Component_Fragment = { id: string; kind: 'Component' }

export type ContainerNode_Page_Fragment = { id: string; kind: 'Page' }

export type ContainerNodeFragment =
  | ContainerNode_Component_Fragment
  | ContainerNode_Page_Fragment

export type ElementFragment = {
  __typename: 'Element'
  id: string
  name: string
  slug: string
  customCss?: string | null
  guiCss?: string | null
  preserveRef?: boolean | null
  childMapperPropKey?: string | null
  renderForEachPropKey?: string | null
  renderIfExpression?: string | null
  closestContainerNode:
    | ContainerNode_Component_Fragment
    | ContainerNode_Page_Fragment
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
  childMapperPreviousSibling?: { id: string } | null
  childMapperComponent?: { id: string; name: string } | null
  preRenderAction?:
    | { id: string; type: Types.ActionKind }
    | { id: string; type: Types.ActionKind }
    | null
  postRenderAction?:
    | { id: string; type: Types.ActionKind }
    | { id: string; type: Types.ActionKind }
    | null
}

export type ProductionElementFragment = {
  __typename: 'Element'
  id: string
  name: string
  slug: string
  customCss?: string | null
  guiCss?: string | null
  childMapperPropKey?: string | null
  renderForEachPropKey?: string | null
  renderIfExpression?: string | null
  preserveRef?: boolean | null
  closestContainerNode:
    | ContainerNode_Component_Fragment
    | ContainerNode_Page_Fragment
  page?: { id: string } | null
  renderComponentType?: { id: string } | null
  renderAtomType?: ProductionAtomFragment | null
  renderType?: { id: string; kind: Types.RenderTypeKind } | null
  prevSibling?: { id: string } | null
  nextSibling?: { id: string } | null
  parentComponent?: { id: string } | null
  parent?: { id: string } | null
  firstChild?: { id: string } | null
  props: PropFragment
  childMapperPreviousSibling?: { id: string } | null
  childMapperComponent?: { id: string; name: string } | null
  preRenderAction?:
    | { id: string; type: Types.ActionKind }
    | { id: string; type: Types.ActionKind }
    | null
  postRenderAction?:
    | { id: string; type: Types.ActionKind }
    | { id: string; type: Types.ActionKind }
    | null
}

export const ContainerNodeFragmentDoc = gql`
  fragment ContainerNode on ContainerNode {
    ... on Page {
      kind: __typename
      id
    }
    ... on Component {
      kind: __typename
      id
    }
  }
`
export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    id
    name
    slug
    customCss
    closestContainerNode {
      ...ContainerNode
    }
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
    preserveRef
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
    childMapperPreviousSibling {
      id
    }
    childMapperPropKey
    childMapperComponent {
      id
      name
    }
    renderForEachPropKey
    renderIfExpression
    preRenderAction {
      id
      type
    }
    postRenderAction {
      id
      type
    }
  }
  ${ContainerNodeFragmentDoc}
  ${AtomFragmentDoc}
  ${PropFragmentDoc}
`
export const ProductionElementFragmentDoc = gql`
  fragment ProductionElement on Element {
    __typename
    id
    name
    slug
    customCss
    closestContainerNode {
      ...ContainerNode
    }
    guiCss
    page {
      id
    }
    renderComponentType {
      id
    }
    renderAtomType {
      ...ProductionAtom
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
    childMapperPreviousSibling {
      id
    }
    childMapperPropKey
    childMapperComponent {
      id
      name
    }
    renderForEachPropKey
    renderIfExpression
    preserveRef
    preRenderAction {
      id
      type
    }
    postRenderAction {
      id
      type
    }
  }
  ${ContainerNodeFragmentDoc}
  ${ProductionAtomFragmentDoc}
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
