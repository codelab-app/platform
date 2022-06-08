import * as Types from '@codelab/shared/abstract/codegen'

import {
  PropFragment,
  PropMapBindingFragment,
} from '../prop/prop.fragment.graphql.gen'
import {
  Action_CustomAction_Fragment,
  Action_PipelineAction_Fragment,
  Action_ResourceAction_Fragment,
} from '../action/action.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  PropFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../prop/prop.fragment.graphql.gen'
import { ActionFragmentDoc } from '../action/action.fragment.graphql.gen'
export type StoreFragment = {
  __typename: 'Store'
  id: string
  name: string
  stateApi: { id: string; name: string }
  state: PropFragment
  actions: Array<
    | Action_CustomAction_Fragment
    | Action_PipelineAction_Fragment
    | Action_ResourceAction_Fragment
  >
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
  }
  ${PropFragmentDoc}
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
