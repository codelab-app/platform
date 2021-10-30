import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestCreateTagMutationVariables = Types.Exact<{
  input: Types.CreateTagInput;
}>;


export type TestCreateTagMutation = { createTag: { id: string } };


export const TestCreateTagGql = `
    mutation TestCreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateTag(variables: TestCreateTagMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreateTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateTagMutation>(TestCreateTagGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateTag');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;