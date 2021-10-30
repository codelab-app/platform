import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetPageQueryVariables = Types.Exact<{
  input: Types.GetPageInput;
}>;


export type TestGetPageQuery = { page?: { id: string, name: string } | null | undefined };


export const TestGetPageGql = `
    query TestGetPage($input: GetPageInput!) {
  page: getPage(input: $input) {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetPage(variables: TestGetPageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetPageQuery>(TestGetPageGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetPage');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;