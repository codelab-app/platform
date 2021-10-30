import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpdateElementMutationVariables = Types.Exact<{
  input: Types.UpdateElementInput;
}>;


export type TestUpdateElementMutation = { updateElement?: void | null | undefined };


export const TestUpdateElementGql = `
    mutation TestUpdateElement($input: UpdateElementInput!) {
  updateElement(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateElement(variables: TestUpdateElementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateElementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateElementMutation>(TestUpdateElementGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateElement');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;