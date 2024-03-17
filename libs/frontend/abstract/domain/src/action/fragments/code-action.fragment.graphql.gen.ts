import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseAction_ApiAction_Fragment,
  BaseAction_CodeAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { BaseActionFragmentDoc } from './action-base.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type CodeActionFragment = {
  code: string
} & BaseAction_CodeAction_Fragment

export const CodeActionFragmentDoc = gql`
  fragment CodeAction on CodeAction {
    ...BaseAction
    code
  }
  ${BaseActionFragmentDoc}
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
