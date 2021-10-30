import * as Types from '@codelab/shared/codegen/graphql';

import { TestAppFragment } from '../../../application/app.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestAppFragmentDoc } from '../../../application/app.fragment.graphql.gen';
export type TestGetAppQueryVariables = Types.Exact<{
  input: Types.GetAppInput;
}>;


export type TestGetAppQuery = { getApp?: TestAppFragment | null | undefined };


export const TestGetAppGql = `
    query TestGetApp($input: GetAppInput!) {
  getApp(input: $input) {
    ...TestApp
  }
}
    ${TestAppFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetApp(variables: TestGetAppQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetAppQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetAppQuery>(TestGetAppGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetApp');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;