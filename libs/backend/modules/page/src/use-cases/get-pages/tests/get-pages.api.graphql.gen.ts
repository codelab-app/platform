import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetPagesQueryVariables = Types.Exact<{
  input: Types.GetPagesInput;
}>;


export type TestGetPagesQuery = { pages: Array<{ id: string, name: string }> };


export const TestGetPagesGql = `
    query TestGetPages($input: GetPagesInput!) {
  pages: getPages(input: $input) {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetPages(variables: TestGetPagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetPagesQuery>(TestGetPagesGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetPages');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;