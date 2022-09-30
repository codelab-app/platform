import * as Types from '@codelab/shared/abstract/codegen'

import {
  ActionBase_ApiAction_Fragment,
  ActionBase_CodeAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { CodeActionFragment } from './code-action.fragment.graphql.gen'
import { ApiActionFragment } from './api-action.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ActionBaseFragmentDoc } from './action-base.fragment.graphql.gen'
import { CodeActionFragmentDoc } from './code-action.fragment.graphql.gen'
import { ApiActionFragmentDoc } from './api-action.fragment.graphql.gen'
export type Action_ApiAction_Fragment = ApiActionFragment &
  ActionBase_ApiAction_Fragment

export type Action_CodeAction_Fragment = CodeActionFragment &
  ActionBase_CodeAction_Fragment

export type ActionFragment =
  | Action_ApiAction_Fragment
  | Action_CodeAction_Fragment

export const ActionFragmentDoc = gql`
  fragment Action on ActionBase {
    ...ActionBase
    ... on CodeAction {
      ...CodeAction
    }
    ... on ApiAction {
      ...ApiAction
    }
  }
  ${ActionBaseFragmentDoc}
  ${CodeActionFragmentDoc}
  ${ApiActionFragmentDoc}
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
