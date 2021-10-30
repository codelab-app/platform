import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpsertTagMutationVariables = Types.Exact<{
  input: Types.UpsertTagInput;
}>;


export type TestUpsertTagMutation = { upsertTag: void };


export const TestUpsertTagGql = `
    mutation TestUpsertTag($input: UpsertTagInput!) {
  upsertTag(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpsertTag(variables: TestUpsertTagMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpsertTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpsertTagMutation>(TestUpsertTagGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpsertTag');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;