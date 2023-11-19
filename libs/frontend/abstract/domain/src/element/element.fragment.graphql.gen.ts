import * as Types from '@codelab/shared/abstract/codegen'

import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import {
  AtomDevelopmentFragment,
  AtomProductionFragment,
} from '../atom/atom.fragment.graphql.gen'
import {
  Type_ActionType_Fragment,
  Type_AppType_Fragment,
  Type_ArrayType_Fragment,
  Type_CodeMirrorType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_PageType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropType_Fragment,
  Type_UnionType_Fragment,
} from '../type/fragments/type.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
import {
  AtomDevelopmentFragmentDoc,
  AtomProductionFragmentDoc,
} from '../atom/atom.fragment.graphql.gen'
import { TypeFragmentDoc } from '../type/fragments/type.fragment.graphql.gen'
export type ElementFragment = {
  __typename: 'Element'
  childMapperPropKey?: string | null
  id: string
  name: string
  renderForEachPropKey?: string | null
  renderIfExpression?: string | null
  style?: string | null
  tailwindClassNames?: Array<string> | null
  childMapperComponent?: { id: string; name: string } | null
  childMapperPreviousSibling?: { id: string } | null
  firstChild?: { id: string } | null
  nextSibling?: { id: string } | null
  page?: { id: string } | null
  parentComponent?: { id: string } | null
  parentElement?: { id: string } | null
  postRenderAction?:
    | { id: string; type: Types.ActionKind }
    | { id: string; type: Types.ActionKind }
    | null
  preRenderAction?:
    | { id: string; type: Types.ActionKind }
    | { id: string; type: Types.ActionKind }
    | null
  prevSibling?: { id: string } | null
  props: PropFragment
  renderType:
    | ({ __typename: 'Atom' } & AtomDevelopmentFragment)
    | { __typename: 'Component'; id: string }
  types: Array<
    | Type_ActionType_Fragment
    | Type_AppType_Fragment
    | Type_ArrayType_Fragment
    | Type_CodeMirrorType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_PageType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropType_Fragment
    | Type_UnionType_Fragment
  >
}

export type ElementProductionFragment = {
  __typename: 'Element'
  childMapperPropKey?: string | null
  id: string
  name: string
  renderForEachPropKey?: string | null
  renderIfExpression?: string | null
  style?: string | null
  tailwindClassNames?: Array<string> | null
  childMapperComponent?: { id: string; name: string } | null
  childMapperPreviousSibling?: { id: string } | null
  firstChild?: { id: string } | null
  nextSibling?: { id: string } | null
  page?: { id: string } | null
  parentComponent?: { id: string } | null
  parentElement?: { id: string } | null
  postRenderAction?:
    | { id: string; type: Types.ActionKind }
    | { id: string; type: Types.ActionKind }
    | null
  preRenderAction?:
    | { id: string; type: Types.ActionKind }
    | { id: string; type: Types.ActionKind }
    | null
  prevSibling?: { id: string } | null
  props: PropFragment
  renderType:
    | ({ __typename: 'Atom' } & AtomProductionFragment)
    | { __typename: 'Component'; id: string }
  types: Array<
    | Type_ActionType_Fragment
    | Type_AppType_Fragment
    | Type_ArrayType_Fragment
    | Type_CodeMirrorType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_PageType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropType_Fragment
    | Type_UnionType_Fragment
  >
}

export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    childMapperComponent {
      id
      name
    }
    childMapperPreviousSibling {
      id
    }
    childMapperPropKey
    firstChild {
      id
    }
    id
    name
    nextSibling {
      id
    }
    page {
      id
    }
    parentComponent {
      id
    }
    parentElement {
      id
    }
    postRenderAction {
      id
      type
    }
    preRenderAction {
      id
      type
    }
    prevSibling {
      id
    }
    props {
      ...Prop
    }
    renderForEachPropKey
    renderIfExpression
    renderType {
      ... on Atom {
        __typename
        ...AtomDevelopment
      }
      ... on Component {
        __typename
        id
      }
    }
    style
    tailwindClassNames
    types {
      ...Type
    }
  }
  ${PropFragmentDoc}
  ${AtomDevelopmentFragmentDoc}
  ${TypeFragmentDoc}
`
export const ElementProductionFragmentDoc = gql`
  fragment ElementProduction on Element {
    __typename
    childMapperComponent {
      id
      name
    }
    childMapperPreviousSibling {
      id
    }
    childMapperPropKey
    firstChild {
      id
    }
    id
    name
    nextSibling {
      id
    }
    page {
      id
    }
    parentComponent {
      id
    }
    parentElement {
      id
    }
    postRenderAction {
      id
      type
    }
    preRenderAction {
      id
      type
    }
    prevSibling {
      id
    }
    props {
      ...Prop
    }
    renderForEachPropKey
    renderIfExpression
    renderType {
      ... on Atom {
        __typename
        ...AtomProduction
      }
      ... on Component {
        __typename
        id
      }
    }
    style
    tailwindClassNames
    types {
      ...Type
    }
  }
  ${PropFragmentDoc}
  ${AtomProductionFragmentDoc}
  ${TypeFragmentDoc}
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
