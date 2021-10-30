import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestCreateTypeMutationVariables = Types.Exact<{
  input: Types.CreateTypeInput;
}>;


export type TestCreateTypeMutation = { createType: { id: string } };


export const TestCreateTypeGql = `
    mutation TestCreateType($input: CreateTypeInput!) {
  createType(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateType(variables: TestCreateTypeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreateTypeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateTypeMutation>(TestCreateTypeGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateType');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;