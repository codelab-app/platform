import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestCreateElementMutationVariables = Types.Exact<{
  input: Types.CreateElementInput;
}>;


export type TestCreateElementMutation = { createElement: { id: string } };


export const TestCreateElementGql = `
    mutation TestCreateElement($input: CreateElementInput!) {
  createElement(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateElement(variables: TestCreateElementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreateElementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateElementMutation>(TestCreateElementGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateElement');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;