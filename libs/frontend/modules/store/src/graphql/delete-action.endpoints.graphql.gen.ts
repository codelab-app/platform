import * as Types from '@codelab/shared/abstract/codegen';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
export type DeleteCustomActionsMutationVariables = Types.Exact<{
  where: Types.CustomActionWhere;
}>;


export type DeleteCustomActionsMutation = { deleteCustomActions: { nodesDeleted: number, relationshipsDeleted: number } };

export type DeleteResourceActionsMutationVariables = Types.Exact<{
  where: Types.ResourceActionWhere;
}>;


export type DeleteResourceActionsMutation = { deleteResourceActions: { nodesDeleted: number, relationshipsDeleted: number } };


export const DeleteCustomActionsDocument = gql`
    mutation DeleteCustomActions($where: CustomActionWhere!) {
  deleteCustomActions(where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `;
export const DeleteResourceActionsDocument = gql`
    mutation DeleteResourceActions($where: ResourceActionWhere!) {
  deleteResourceActions(where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    DeleteCustomActions(variables: DeleteCustomActionsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteCustomActionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCustomActionsMutation>(DeleteCustomActionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteCustomActions', 'mutation');
    },
    DeleteResourceActions(variables: DeleteResourceActionsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteResourceActionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteResourceActionsMutation>(DeleteResourceActionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteResourceActions', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;