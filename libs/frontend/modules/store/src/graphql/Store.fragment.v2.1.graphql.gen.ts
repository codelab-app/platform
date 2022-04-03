import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type StoreFragment = {
  __typename: 'Store'
  id: string
  name: string
  initialState: string
  state: { id: string; name: string }
  actions: Array<{ id: string; name: string }>
  parentStore?: { id: string; name: string } | null | undefined
  parentStoreConnection: { edges: Array<{ storeKey: string }> }
}

export type StoreEdgeFragment = {
  source: string
  target: string
  storeKey: string
}

export type StoreGraphFragment = {
  edges: Array<StoreEdgeFragment>
  vertices: Array<StoreFragment>
}

export const StoreEdgeFragmentDoc = gql`
  fragment StoreEdge on StoreEdge {
    source
    target
    storeKey
  }
`
export const StoreFragmentDoc = gql`
  fragment Store on Store {
    __typename
    id
    name
    state {
      id
      name
    }
    initialState
    actions {
      id
      name
    }
    parentStore {
      id
      name
    }
    parentStoreConnection {
      edges {
        storeKey
      }
    }
  }
`
export const StoreGraphFragmentDoc = gql`
  fragment StoreGraph on StoreGraph {
    edges {
      ...StoreEdge
    }
    vertices {
      ...Store
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
