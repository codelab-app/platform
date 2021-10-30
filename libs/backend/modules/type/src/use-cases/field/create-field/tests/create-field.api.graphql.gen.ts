import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestCreateFieldMutationVariables = Types.Exact<{
  input: Types.CreateFieldInput;
}>;


export type TestCreateFieldMutation = { createField: { id: string } };


export const TestCreateFieldGql = `
    mutation TestCreateField($input: CreateFieldInput!) {
  createField(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateField(variables: TestCreateFieldMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreateFieldMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateFieldMutation>(TestCreateFieldGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateField');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;