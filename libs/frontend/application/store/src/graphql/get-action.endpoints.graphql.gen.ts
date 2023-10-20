import * as Types from '@codelab/shared/abstract/codegen'

import {
  Action_ApiAction_Fragment,
  Action_CodeAction_Fragment,
} from '../../../../abstract/domain/src/action/fragments/action.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { ActionFragmentDoc } from '../../../../abstract/domain/src/action/fragments/action.fragment.graphql.gen'
export type GetActionsQueryVariables = Types.Exact<{
  codeActionWhere?: Types.InputMaybe<Types.CodeActionWhere>
  apiActionWhere?: Types.InputMaybe<Types.ApiActionWhere>
}>

export type GetActionsQuery = {
  apiActions: Array<Action_ApiAction_Fragment>
  codeActions: Array<Action_CodeAction_Fragment>
}

export const GetActionsDocument = gql`
  query GetActions(
    $codeActionWhere: CodeActionWhere
    $apiActionWhere: ApiActionWhere
  ) {
    apiActions(where: $apiActionWhere) {
      ...Action
    }
    codeActions(where: $codeActionWhere) {
      ...Action
    }
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
  return {
    GetActions(
      variables?: GetActionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetActionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetActionsQuery>(GetActionsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetActions',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
