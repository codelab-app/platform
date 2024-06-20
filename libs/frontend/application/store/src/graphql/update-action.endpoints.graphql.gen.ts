import * as Types from '@codelab/shared/abstract/codegen';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type UpdateCodeActionsMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.CodeActionConnectInput>;
  create?: Types.InputMaybe<Types.CodeActionRelationInput>;
  delete?: Types.InputMaybe<Types.CodeActionDeleteInput>;
  disconnect?: Types.InputMaybe<Types.CodeActionDisconnectInput>;
  update?: Types.InputMaybe<Types.CodeActionUpdateInput>;
  where?: Types.InputMaybe<Types.CodeActionWhere>;
}>;


export type UpdateCodeActionsMutation = { updateCodeActions: { codeActions: Array<{ id: string }> } };

export type UpdateApiActionsMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ApiActionConnectInput>;
  create?: Types.InputMaybe<Types.ApiActionRelationInput>;
  delete?: Types.InputMaybe<Types.ApiActionDeleteInput>;
  disconnect?: Types.InputMaybe<Types.ApiActionDisconnectInput>;
  update?: Types.InputMaybe<Types.ApiActionUpdateInput>;
  where?: Types.InputMaybe<Types.ApiActionWhere>;
}>;


export type UpdateApiActionsMutation = { updateApiActions: { apiActions: Array<{ id: string }> } };


export const UpdateCodeActionsDocument = gql`
    mutation UpdateCodeActions($connect: CodeActionConnectInput, $create: CodeActionRelationInput, $delete: CodeActionDeleteInput, $disconnect: CodeActionDisconnectInput, $update: CodeActionUpdateInput, $where: CodeActionWhere) {
  updateCodeActions(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    codeActions {
      id
    }
  }
}
    `;
export const UpdateApiActionsDocument = gql`
    mutation UpdateApiActions($connect: ApiActionConnectInput, $create: ApiActionRelationInput, $delete: ApiActionDeleteInput, $disconnect: ApiActionDisconnectInput, $update: ApiActionUpdateInput, $where: ApiActionWhere) {
  updateApiActions(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    apiActions {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UpdateCodeActions(variables?: UpdateCodeActionsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateCodeActionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCodeActionsMutation>(UpdateCodeActionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateCodeActions', 'mutation', variables);
    },
    UpdateApiActions(variables?: UpdateApiActionsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateApiActionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateApiActionsMutation>(UpdateApiActionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateApiActions', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;