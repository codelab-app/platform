import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestDeleteElementMutationVariables = Types.Exact<{
  input: Types.DeleteElementInput;
}>;


export type TestDeleteElementMutation = { deleteElement?: void | null | undefined };


export const TestDeleteElementGql = `
    mutation TestDeleteElement($input: DeleteElementInput!) {
  deleteElement(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeleteElement(variables: TestDeleteElementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeleteElementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteElementMutation>(TestDeleteElementGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteElement');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;