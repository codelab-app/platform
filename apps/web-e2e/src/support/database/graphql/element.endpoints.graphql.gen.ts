import * as Types from '@codelab/shared/abstract/codegen'

import { E2eAtomFragment } from './atom.endpoints.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { E2eAtomFragmentDoc } from './atom.endpoints.graphql.gen'
export type E2eCreateElementMutationVariables = Types.Exact<{
  input: Array<Types.ElementCreateInput> | Types.ElementCreateInput
}>

export type E2eCreateElementMutation = {
  createElements: { elements: Array<E2eElementFragment> }
}

export type E2eUpdateElementMutationVariables = Types.Exact<{
  update: Types.ElementUpdateInput
}>

export type E2eUpdateElementMutation = {
  updateElements: { elements: Array<E2eElementFragment> }
}

export type E2eElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null
  css?: string | null
  renderForEachPropKey?: string | null
  renderIfPropKey?: string | null
  propTransformationJs?: string | null
  component?: { id: string; name: string } | null
  instanceOfComponent?: { id: string; name: string } | null
  parentElement?: { id: string; name?: string | null } | null
  atom?: E2eAtomFragment | null
  props?: E2ePropFragment | null
  hooks: Array<E2eHookFragment>
  propMapBindings: Array<E2ePropMapBindingFragment>
  parentElementConnection: {
    edges: Array<{
      order?: number | null
      node: { id: string; name?: string | null }
    }>
  }
}

export type E2ePropFragment = { id: string; data: string }

export type E2eHookFragment = {
  id: string
  type: Types.AtomType
  config: E2ePropFragment
  element: { id: string; name?: string | null }
}

export type E2ePropMapBindingFragment = {
  id: string
  sourceKey: string
  targetKey: string
  element: { id: string; name?: string | null }
  targetElement?: { id: string; name?: string | null } | null
}

export const E2ePropFragmentDoc = gql`
  fragment E2eProp on Prop {
    id
    data
  }
`
export const E2eHookFragmentDoc = gql`
  fragment E2eHook on Hook {
    id
    type
    config {
      ...E2eProp
    }
    element {
      id
      name
    }
  }
  ${E2ePropFragmentDoc}
`
export const E2ePropMapBindingFragmentDoc = gql`
  fragment E2ePropMapBinding on PropMapBinding {
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
export const E2eElementFragmentDoc = gql`
  fragment E2eElement on Element {
    __typename
    id
    name
    css
    component {
      id
      name
    }
    instanceOfComponent {
      id
      name
    }
    parentElement {
      id
      name
    }
    atom {
      ...E2eAtom
    }
    props {
      ...E2eProp
    }
    hooks {
      ...E2eHook
    }
    renderForEachPropKey
    renderIfPropKey
    propMapBindings {
      ...E2ePropMapBinding
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
  ${E2eAtomFragmentDoc}
  ${E2ePropFragmentDoc}
  ${E2eHookFragmentDoc}
  ${E2ePropMapBindingFragmentDoc}
`
export const E2eCreateElementDocument = gql`
  mutation E2eCreateElement($input: [ElementCreateInput!]!) {
    createElements(input: $input) {
      elements {
        ...E2eElement
      }
    }
  }
  ${E2eElementFragmentDoc}
`
export const E2eUpdateElementDocument = gql`
  mutation E2eUpdateElement($update: ElementUpdateInput!) {
    updateElements(update: $update) {
      elements {
        ...E2eElement
      }
    }
  }
  ${E2eElementFragmentDoc}
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
  return {
    E2eCreateElement(
      variables: E2eCreateElementMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateElementMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateElementMutation>(
            E2eCreateElementDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateElement',
        'mutation',
      )
    },
    E2eUpdateElement(
      variables: E2eUpdateElementMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eUpdateElementMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eUpdateElementMutation>(
            E2eUpdateElementDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eUpdateElement',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
