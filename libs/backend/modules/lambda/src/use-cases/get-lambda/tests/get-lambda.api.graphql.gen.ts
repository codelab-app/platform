import * as Types from '@codelab/shared/codegen/graphql';

import { TestLambdaFragment } from '../../../domain/lambda.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestLambdaFragmentDoc } from '../../../domain/lambda.fragment.graphql.gen';
export type TestGetLambdaQueryVariables = Types.Exact<{
  input: Types.GetLambdaInput;
}>;


export type TestGetLambdaQuery = { getLambda?: TestLambdaFragment | null | undefined };


export const TestGetLambdaGql = `
    query TestGetLambda($input: GetLambdaInput!) {
  getLambda(input: $input) {
    ...TestLambda
  }
}
    ${TestLambdaFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetLambda(variables: TestGetLambdaQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetLambdaQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetLambdaQuery>(TestGetLambdaGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetLambda');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;