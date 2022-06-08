import * as Types from '@codelab/shared/abstract/codegen'

import {
  Action_CustomAction_Fragment,
  Action_PipelineAction_Fragment,
  Action_ResourceAction_Fragment,
} from '../../../../../shared/abstract/core/src/domain/action/action.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ActionFragmentDoc } from '../../../../../shared/abstract/core/src/domain/action/action.fragment.graphql.gen'
export type GetActionsQueryVariables = Types.Exact<{
  storeId?: Types.InputMaybe<Types.Scalars['ID']>
}>

export type GetActionsQuery = {
  customActions: Array<Action_CustomAction_Fragment>
  resourceActions: Array<Action_ResourceAction_Fragment>
  pipelineActions: Array<Action_PipelineAction_Fragment>
}

export const GetActionsDocument = gql`
  query GetActions($storeId: ID) {
    customActions(where: { store: { id: $storeId } }) {
      ...Action
    }
    resourceActions(where: { store: { id: $storeId } }) {
      ...Action
    }
    pipelineActions(where: { store: { id: $storeId } }) {
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
      requestHeaders?: Dom.RequestInit['headers'],
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
