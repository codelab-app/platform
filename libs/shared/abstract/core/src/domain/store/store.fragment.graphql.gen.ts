import * as Types from '@codelab/shared/abstract/codegen'

import { ActionFragment } from './action.fragment.graphql.gen'
import { ResourceFragment } from '../resource/resource.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ActionFragmentDoc } from './action.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../resource/resource.fragment.graphql.gen'
export type StoreFragment = {
  __typename: 'Store'
  id: string
  name: string
  localState: string
  state: { id: string; name: string }
  actions: Array<ActionFragment>
  parentStore?: { id: string; name: string } | null
  parentStoreConnection: { edges: Array<{ storeKey: string }> }
  resourcesConnection: {
    edges: Array<{ resourceKey: string; node: { id: string } }>
  }
  resources: Array<ResourceFragment>
  children: Array<{ id: string }>
}

export const StoreFragmentDoc = gql`
  fragment Store on Store {
    __typename
    id
    name
    state {
      id
      name
    }
    localState
    actions {
      ...Action
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
    resourcesConnection {
      edges {
        node {
          id
        }
        resourceKey
      }
    }
    resources {
      ...Resource
    }
    children {
      id
    }
  }
  ${ActionFragmentDoc}
  ${ResourceFragmentDoc}
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
