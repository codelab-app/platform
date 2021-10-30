import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpdateComponentMutationVariables = Types.Exact<{
  input: Types.UpdateComponentInput;
}>;


export type TestUpdateComponentMutation = { updateComponent?: void | null | undefined };


export const TestUpdateComponentGql = `
    mutation TestUpdateComponent($input: UpdateComponentInput!) {
  updateComponent(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateComponent(variables: TestUpdateComponentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateComponentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateComponentMutation>(TestUpdateComponentGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateComponent');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;