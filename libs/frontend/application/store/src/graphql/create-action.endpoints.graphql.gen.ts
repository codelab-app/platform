import * as Types from '@codelab/shared/abstract/codegen';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type CreateCodeActionsMutationVariables = Types.Exact<{
  input: Array<Types.CodeActionCreateInput> | Types.CodeActionCreateInput;
}>;


export type CreateCodeActionsMutation = { createCodeActions: { codeActions: Array<{ id: string }> } };

export type CreateApiActionsMutationVariables = Types.Exact<{
  input: Array<Types.ApiActionCreateInput> | Types.ApiActionCreateInput;
}>;


export type CreateApiActionsMutation = { createApiActions: { apiActions: Array<{ id: string }> } };


export const CreateCodeActionsDocument = gql`
    mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
  createCodeActions(input: $input) {
    codeActions {
      id
    }
  }
}
    `;
export const CreateApiActionsDocument = gql`
    mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
  createApiActions(input: $input) {
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
    CreateCodeActions(variables: CreateCodeActionsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateCodeActionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCodeActionsMutation>(CreateCodeActionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateCodeActions', 'mutation', variables);
    },
    CreateApiActions(variables: CreateApiActionsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateApiActionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateApiActionsMutation>(CreateApiActionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateApiActions', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;