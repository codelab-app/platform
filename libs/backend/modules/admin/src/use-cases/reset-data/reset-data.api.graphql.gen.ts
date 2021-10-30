import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestResetDataMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type TestResetDataMutation = { resetData?: void | null | undefined };


export const TestResetDataGql = `
    mutation TestResetData {
  resetData
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestResetData(variables?: TestResetDataMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestResetDataMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestResetDataMutation>(TestResetDataGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestResetData');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;