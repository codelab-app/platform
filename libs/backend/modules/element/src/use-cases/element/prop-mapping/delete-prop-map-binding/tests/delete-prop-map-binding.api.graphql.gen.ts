import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestDeletePropMapBindingMutationVariables = Types.Exact<{
  input: Types.DeletePropMapBindingInput;
}>;


export type TestDeletePropMapBindingMutation = { deletePropMapBinding?: void | null | undefined };


export const TestDeletePropMapBindingGql = `
    mutation TestDeletePropMapBinding($input: DeletePropMapBindingInput!) {
  deletePropMapBinding(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeletePropMapBinding(variables: TestDeletePropMapBindingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeletePropMapBindingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeletePropMapBindingMutation>(TestDeletePropMapBindingGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeletePropMapBinding');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;