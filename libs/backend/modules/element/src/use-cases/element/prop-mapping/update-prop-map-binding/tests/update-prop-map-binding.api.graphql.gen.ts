import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpdatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.UpdatePropMapBindingInput;
}>;


export type TestUpdatePropMapBindingMutation = { updatePropMapBinding?: void | null | undefined };


export const TestUpdatePropMapBindingGql = `
    mutation TestUpdatePropMapBinding($input: UpdatePropMapBindingInput!) {
  updatePropMapBinding(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdatePropMapBinding(variables: TestUpdatePropMapBindingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdatePropMapBindingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdatePropMapBindingMutation>(TestUpdatePropMapBindingGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdatePropMapBinding');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;