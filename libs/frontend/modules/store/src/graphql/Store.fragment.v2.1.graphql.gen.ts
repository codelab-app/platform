import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  InterfaceTypeFragment,
  InterfaceTypeFieldEdgeFragment,
} from '../../../type/src/graphql/fragments/Interface.fragment.v2.1.graphql.gen'
import {
  TypeBase_AppType_Fragment,
  TypeBase_ArrayType_Fragment,
  TypeBase_ElementType_Fragment,
  TypeBase_EnumType_Fragment,
  TypeBase_InterfaceType_Fragment,
  TypeBase_LambdaType_Fragment,
  TypeBase_MonacoType_Fragment,
  TypeBase_PageType_Fragment,
  TypeBase_PrimitiveType_Fragment,
  TypeBase_ReactNodeType_Fragment,
  TypeBase_RenderPropsType_Fragment,
  TypeBase_UnionType_Fragment,
} from '../../../type/src/graphql/fragments/TypeBase.fragment.v2.1.graphql.gen'
import { ActionFragment } from './Action.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeFieldEdgeFragmentDoc,
} from '../../../type/src/graphql/fragments/Interface.fragment.v2.1.graphql.gen'
import { TypeBaseFragmentDoc } from '../../../type/src/graphql/fragments/TypeBase.fragment.v2.1.graphql.gen'
import { ActionFragmentDoc } from './Action.fragment.v2.1.graphql.gen'
export type StoreFragment = {
  __typename: 'Store'
  id: string
  name: string
  initialState: string
  state: InterfaceTypeFragment
  actions: Array<ActionFragment>
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
      ...InterfaceType
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
