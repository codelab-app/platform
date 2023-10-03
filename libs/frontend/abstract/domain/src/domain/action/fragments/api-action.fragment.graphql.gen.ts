import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseAction_ApiAction_Fragment,
  BaseAction_CodeAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { ResourceFragment } from '../../resource/resource.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { BaseActionFragmentDoc } from './action-base.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../resource/resource.fragment.graphql.gen'
export type ApiActionFragment = {
  config: { data: string; id: string }
  errorAction?:
    | BaseAction_ApiAction_Fragment
    | BaseAction_CodeAction_Fragment
    | null
  resource: ResourceFragment
  successAction?:
    | BaseAction_ApiAction_Fragment
    | BaseAction_CodeAction_Fragment
    | null
} & BaseAction_ApiAction_Fragment

export const ApiActionFragmentDoc = gql`
  fragment ApiAction on ApiAction {
    ...BaseAction
    config {
      data
      id
    }
    errorAction {
      ...BaseAction
    }
    resource {
      ...Resource
    }
    successAction {
      ...BaseAction
    }
  }
  ${BaseActionFragmentDoc}
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
