import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestCreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput;
}>;


export type TestCreatePageMutation = { createPage: { id: string } };


export const TestCreatePageGql = `
    mutation TestCreatePage($input: CreatePageInput!) {
  createPage(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreatePage(variables: TestCreatePageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreatePageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreatePageMutation>(TestCreatePageGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreatePage');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;