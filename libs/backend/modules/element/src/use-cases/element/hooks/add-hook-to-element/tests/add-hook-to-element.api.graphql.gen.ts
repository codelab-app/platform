import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestAddHookToElementMutationVariables = Types.Exact<{
  input: Types.AddHookToElementInput;
}>;


export type TestAddHookToElementMutation = { addHookToElement: { id: string } };


export const TestAddHookToElementGql = `
    mutation TestAddHookToElement($input: AddHookToElementInput!) {
  addHookToElement(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestAddHookToElement(variables: TestAddHookToElementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestAddHookToElementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestAddHookToElementMutation>(TestAddHookToElementGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestAddHookToElement');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;