import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseAction_ApiAction_Fragment,
  BaseAction_CodeAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { CodeActionFragment } from './code-action.fragment.graphql.gen'
import { ApiActionFragment } from './api-action.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { BaseActionFragmentDoc } from './action-base.fragment.graphql.gen'
import { CodeActionFragmentDoc } from './code-action.fragment.graphql.gen'
import { ApiActionFragmentDoc } from './api-action.fragment.graphql.gen'
export type Action_ApiAction_Fragment = ApiActionFragment &
  BaseAction_ApiAction_Fragment

export type Action_CodeAction_Fragment = CodeActionFragment &
  BaseAction_CodeAction_Fragment

export type ActionFragment =
  | Action_ApiAction_Fragment
  | Action_CodeAction_Fragment

export const ActionFragmentDoc = gql`
  fragment Action on BaseAction {
    ...BaseAction
    ... on CodeAction {
      ...CodeAction
    }
    ... on ApiAction {
      ...ApiAction
    }
  }
  ${BaseActionFragmentDoc}
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
