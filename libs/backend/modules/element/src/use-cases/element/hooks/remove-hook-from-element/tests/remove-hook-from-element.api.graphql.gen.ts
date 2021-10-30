import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestRemoveHookFromElementMutationVariables = Types.Exact<{
  input: Types.RemoveHookFromElementInput;
}>;


export type TestRemoveHookFromElementMutation = { removeHookFromElement?: void | null | undefined };


export const TestRemoveHookFromElementGql = `
    mutation TestRemoveHookFromElement($input: RemoveHookFromElementInput!) {
  removeHookFromElement(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestRemoveHookFromElement(variables: TestRemoveHookFromElementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestRemoveHookFromElementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestRemoveHookFromElementMutation>(TestRemoveHookFromElementGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestRemoveHookFromElement');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;