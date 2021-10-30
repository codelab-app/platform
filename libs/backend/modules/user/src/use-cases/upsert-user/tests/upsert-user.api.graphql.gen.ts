import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type UpsertUserMutationVariables = Types.Exact<{
  input: Types.UpsertUserInput;
}>;


export type UpsertUserMutation = { upsertUser: { id: string } };


export const UpsertUserGql = `
    mutation UpsertUser($input: UpsertUserInput!) {
  upsertUser(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UpsertUser(variables: UpsertUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertUserMutation>(UpsertUserGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertUser');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;