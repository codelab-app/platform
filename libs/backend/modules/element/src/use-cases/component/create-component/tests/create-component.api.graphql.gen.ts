import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestCreateComponentMutationVariables = Types.Exact<{
  input: Types.CreateComponentInput;
}>;


export type TestCreateComponentMutation = { createComponent: { id: string } };


export const TestCreateComponentGql = `
    mutation TestCreateComponent($input: CreateComponentInput!) {
  createComponent(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateComponent(variables: TestCreateComponentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreateComponentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateComponentMutation>(TestCreateComponentGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateComponent');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;