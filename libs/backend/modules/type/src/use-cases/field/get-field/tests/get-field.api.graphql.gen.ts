import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetFieldQueryVariables = Types.Exact<{
  input: Types.GetFieldInput;
}>;


export type TestGetFieldQuery = { getField?: { id: string, key: string, name?: string | null | undefined, description?: string | null | undefined } | null | undefined };


export const TestGetFieldGql = `
    query TestGetField($input: GetFieldInput!) {
  getField(input: $input) {
    id
    key
    name
    description
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetField(variables: TestGetFieldQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetFieldQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetFieldQuery>(TestGetFieldGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetField');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;