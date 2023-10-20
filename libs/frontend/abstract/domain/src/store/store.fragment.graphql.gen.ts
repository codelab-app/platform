import * as Types from '@codelab/shared/abstract/codegen'

import {
  Action_ApiAction_Fragment,
  Action_CodeAction_Fragment,
} from '../action/fragments/action.fragment.graphql.gen'
import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { ActionFragmentDoc } from '../action/fragments/action.fragment.graphql.gen'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.graphql.gen'
export type StoreFragment = {
  id: string
  name: string
  actions: Array<Action_ApiAction_Fragment | Action_CodeAction_Fragment>
  api: InterfaceTypeFragment
  container: { id: string } | { id: string }
}

export type ProductionStoreFragment = {
  id: string
  name: string
  actions: Array<Action_ApiAction_Fragment | Action_CodeAction_Fragment>
  container: { id: string } | { id: string }
}

export const StoreFragmentDoc = gql`
  fragment Store on Store {
    actions {
      ...Action
    }
    api {
      ...InterfaceType
    }
    container {
      ... on Page {
        id
      }
      ... on Component {
        id
      }
    }
    id
    name
  }
  ${ActionFragmentDoc}
  ${InterfaceTypeFragmentDoc}
`
export const ProductionStoreFragmentDoc = gql`
  fragment ProductionStore on Store {
    actions {
      ...Action
    }
    container {
      ... on Page {
        id
      }
      ... on Component {
        id
      }
    }
    id
    name
  }
  ${ActionFragmentDoc}
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
