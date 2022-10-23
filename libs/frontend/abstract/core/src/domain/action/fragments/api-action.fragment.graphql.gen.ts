import * as Types from '@codelab/shared/abstract/codegen'

import {
  ActionBase_ApiAction_Fragment,
  ActionBase_CodeAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { ResourceFragment } from '../../resource/resource.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ActionBaseFragmentDoc } from './action-base.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../resource/resource.fragment.graphql.gen'
export type ApiActionFragment = {
  successAction?:
    | ActionBase_ApiAction_Fragment
    | ActionBase_CodeAction_Fragment
    | null
  errorAction?:
    | ActionBase_ApiAction_Fragment
    | ActionBase_CodeAction_Fragment
    | null
  resource: ResourceFragment
  config: { id: string; data: string }
} & ActionBase_ApiAction_Fragment

export const ApiActionFragmentDoc = gql`
  fragment ApiAction on ApiAction {
    ...ActionBase
    successAction {
      ...ActionBase
    }
    errorAction {
      ...ActionBase
    }
    resource {
      ...Resource
    }
    config {
      id
      data
    }
  }
  ${ActionBaseFragmentDoc}
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
