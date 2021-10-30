import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestCreateLambdaMutationVariables = Types.Exact<{
  input: Types.CreateLambdaInput;
}>;


export type TestCreateLambdaMutation = { createLambda: { id: string } };


export const TestCreateLambdaGql = `
    mutation TestCreateLambda($input: CreateLambdaInput!) {
  createLambda(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateLambda(variables: TestCreateLambdaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreateLambdaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateLambdaMutation>(TestCreateLambdaGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateLambda');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;