import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type GetUserQueryVariables = Types.Exact<{
  input: Types.GetUserInput;
}>;


export type GetUserQuery = { getUser?: { id: string, auth0Id: string, roles: Array<Types.Role> } | null | undefined };


export const GetUserGql = `
    query GetUser($input: GetUserInput!) {
  getUser(input: $input) {
    id
    auth0Id
    roles
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;