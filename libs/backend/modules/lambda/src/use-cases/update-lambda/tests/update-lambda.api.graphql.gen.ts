import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpdateLambdaMutationVariables = Types.Exact<{
  input: Types.UpdateLambdaInput;
}>;


export type TestUpdateLambdaMutation = { updateLambda?: void | null | undefined };


export const TestUpdateLambdaGql = `
    mutation TestUpdateLambda($input: UpdateLambdaInput!) {
  updateLambda(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateLambda(variables: TestUpdateLambdaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateLambdaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateLambdaMutation>(TestUpdateLambdaGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateLambda');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;