import * as Types from '@codelab/shared/abstract/codegen'

import {
  PropFragment,
  PropMapBindingFragment,
} from '../prop/prop.fragment.graphql.gen'
import { ActionFragment } from '../action/action.fragment.graphql.gen'
import { ResourceFragment } from '../resource/resource.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  PropFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../prop/prop.fragment.graphql.gen'
import { ActionFragmentDoc } from '../action/action.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../resource/resource.fragment.graphql.gen'
export type StoreFragment = {
  __typename: 'Store'
  id: string
  name: string
  stateApi: { id: string; name: string }
  state: PropFragment
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
    stateApi {
      id
      name
    }
    state {
      ...Prop
    }
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
  ${PropFragmentDoc}
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
