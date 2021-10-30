import * as Types from '@codelab/shared/codegen/graphql';

import { TestLambdaPayloadFragment } from '../../../domain/lambda-payload.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestLambdaPayloadFragmentDoc } from '../../../domain/lambda-payload.fragment.graphql.gen';
export type TestExecuteLambdaMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput;
}>;


export type TestExecuteLambdaMutation = { executeLambda?: TestLambdaPayloadFragment | null | undefined };


export const TestExecuteLambdaGql = `
    mutation TestExecuteLambda($input: ExecuteLambdaInput!) {
  executeLambda(input: $input) {
    ...TestLambdaPayload
  }
}
    ${TestLambdaPayloadFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestExecuteLambda(variables: TestExecuteLambdaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestExecuteLambdaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestExecuteLambdaMutation>(TestExecuteLambdaGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestExecuteLambda');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;