import * as Types from '@codelab/shared/abstract/codegen'

import {
  Action_ApiAction_Fragment,
  Action_CodeAction_Fragment,
} from '../action/fragments/action.fragment.graphql.gen'
import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { ActionFragmentDoc } from '../action/fragments/action.fragment.graphql.gen'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type StoreFragment = {
  id: string
  name: string
  actions: Array<Action_ApiAction_Fragment | Action_CodeAction_Fragment>
  api: InterfaceTypeFragment
}

export type ProductionStoreFragment = {
  id: string
  name: string
  actions: Array<Action_ApiAction_Fragment | Action_CodeAction_Fragment>
}

export const StoreFragmentDoc = gql`
  fragment Store on Store {
    actions {
      ...Action
    }
    api {
      ...InterfaceType
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
    id
    name
  }
  ${ActionFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
