import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestCreatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.CreatePropMapBindingInput;
}>;


export type TestCreatePropMapBindingMutation = { createPropMapBinding: { id: string } };


export const TestCreatePropMapBindingGql = `
    mutation TestCreatePropMapBinding($input: CreatePropMapBindingInput!) {
  createPropMapBinding(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreatePropMapBinding(variables: TestCreatePropMapBindingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreatePropMapBindingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreatePropMapBindingMutation>(TestCreatePropMapBindingGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreatePropMapBinding');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;