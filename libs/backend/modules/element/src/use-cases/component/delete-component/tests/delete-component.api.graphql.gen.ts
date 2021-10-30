import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestDeleteComponentMutationVariables = Types.Exact<{
  input: Types.DeleteComponentInput;
}>;


export type TestDeleteComponentMutation = { deleteComponent?: void | null | undefined };


export const TestDeleteComponentGql = `
    mutation TestDeleteComponent($input: DeleteComponentInput!) {
  deleteComponent(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeleteComponent(variables: TestDeleteComponentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeleteComponentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteComponentMutation>(TestDeleteComponentGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteComponent');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;