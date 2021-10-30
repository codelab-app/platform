import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetComponentQueryVariables = Types.Exact<{
  input: Types.GetComponentInput;
}>;


export type TestGetComponentQuery = { getComponent?: { id: string, name: string } | null | undefined };


export const TestGetComponentGql = `
    query TestGetComponent($input: GetComponentInput!) {
  getComponent(input: $input) {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetComponent(variables: TestGetComponentQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetComponentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetComponentQuery>(TestGetComponentGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetComponent');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;