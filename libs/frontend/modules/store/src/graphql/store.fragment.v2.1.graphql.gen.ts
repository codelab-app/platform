import * as Types from '@codelab/shared/abstract/codegen-v2'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  ActionFragment,
  ActionFragmentDoc,
} from './action.fragment.v2.1.graphql.gen'

export type StoreFragment = {
  __typename: 'Store'
  id: string
  name: string
  initialState: string
  state: { id: string; name: string }
  actions: Array<ActionFragment>
  parentStore?: { id: string; name: string } | null | undefined
  parentStoreConnection: { edges: Array<{ storeKey: string }> }
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
    initialState
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
    children {
      id
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
