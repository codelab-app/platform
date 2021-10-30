import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpdateTagMutationVariables = Types.Exact<{
  input: Types.UpdateTagInput;
}>;


export type TestUpdateTagMutation = { updateTag?: void | null | undefined };


export const TestUpdateTagGql = `
    mutation TestUpdateTag($input: UpdateTagInput!) {
  updateTag(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateTag(variables: TestUpdateTagMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateTagMutation>(TestUpdateTagGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateTag');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;