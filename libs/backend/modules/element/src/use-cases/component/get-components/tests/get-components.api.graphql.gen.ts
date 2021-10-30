import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetComponentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetComponentsQuery = { getComponents: Array<{ id: string, name: string }> };


export const TestGetComponentsGql = `
    query TestGetComponents {
  getComponents {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetComponents(variables?: TestGetComponentsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetComponentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetComponentsQuery>(TestGetComponentsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetComponents');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;