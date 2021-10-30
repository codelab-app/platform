import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestDeleteLambdaMutationVariables = Types.Exact<{
  input: Types.DeleteLambdaInput;
}>;


export type TestDeleteLambdaMutation = { deleteLambda?: void | null | undefined };


export const TestDeleteLambdaGql = `
    mutation TestDeleteLambda($input: DeleteLambdaInput!) {
  deleteLambda(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeleteLambda(variables: TestDeleteLambdaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeleteLambdaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteLambdaMutation>(TestDeleteLambdaGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteLambda');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;