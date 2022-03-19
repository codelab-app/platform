import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type StoreFragment = {
  __typename: 'Store'
  id: string
  name: string
  actions?: Array<string> | null
  state: Array<{ name: string; type: string; defaultValue: string }>
  parentStore?: { id: string; name: string } | null
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
      name
      type
      defaultValue
    }
    actions
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
