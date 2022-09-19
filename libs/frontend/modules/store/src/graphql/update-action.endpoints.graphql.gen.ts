import * as Types from '@codelab/shared/abstract/codegen';

import { Action_CodeAction_Fragment, Action_ApiAction_Fragment } from '../../../../../shared/abstract/core/src/domain/action/fragments/action.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
import { ActionFragmentDoc } from '../../../../../shared/abstract/core/src/domain/action/fragments/action.fragment.graphql.gen';
export type UpdateCodeActionsMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.CodeActionConnectInput>;
  create?: Types.InputMaybe<Types.CodeActionRelationInput>;
  delete?: Types.InputMaybe<Types.CodeActionDeleteInput>;
  disconnect?: Types.InputMaybe<Types.CodeActionDisconnectInput>;
  update?: Types.InputMaybe<Types.CodeActionUpdateInput>;
  where?: Types.InputMaybe<Types.CodeActionWhere>;
}>;


export type UpdateCodeActionsMutation = { updateCodeActions: { codeActions: Array<Action_CodeAction_Fragment> } };

export type UpdateApiActionsMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ApiActionConnectInput>;
  create?: Types.InputMaybe<Types.ApiActionRelationInput>;
  delete?: Types.InputMaybe<Types.ApiActionDeleteInput>;
  disconnect?: Types.InputMaybe<Types.ApiActionDisconnectInput>;
  update?: Types.InputMaybe<Types.ApiActionUpdateInput>;
  where?: Types.InputMaybe<Types.ApiActionWhere>;
}>;


export type UpdateApiActionsMutation = { updateApiActions: { apiActions: Array<Action_ApiAction_Fragment> } };


export const UpdateCodeActionsDocument = gql`
    mutation UpdateCodeActions($connect: CodeActionConnectInput, $create: CodeActionRelationInput, $delete: CodeActionDeleteInput, $disconnect: CodeActionDisconnectInput, $update: CodeActionUpdateInput, $where: CodeActionWhere) {
  updateCodeActions(
    update: $update
    where: $where
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
  ) {
    codeActions {
      ...Action
    }
  }
}
    ${ActionFragmentDoc}`;
export const UpdateApiActionsDocument = gql`
    mutation UpdateApiActions($connect: ApiActionConnectInput, $create: ApiActionRelationInput, $delete: ApiActionDeleteInput, $disconnect: ApiActionDisconnectInput, $update: ApiActionUpdateInput, $where: ApiActionWhere) {
  updateApiActions(
    update: $update
    where: $where
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
  ) {
    apiActions {
      ...Action
    }
  }
}
    ${ActionFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UpdateCodeActions(variables?: UpdateCodeActionsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateCodeActionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCodeActionsMutation>(UpdateCodeActionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateCodeActions', 'mutation');
    },
    UpdateApiActions(variables?: UpdateApiActionsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateApiActionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateApiActionsMutation>(UpdateApiActionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateApiActions', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;