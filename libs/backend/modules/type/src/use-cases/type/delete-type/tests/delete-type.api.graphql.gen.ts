import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestDeleteTypeMutationVariables = Types.Exact<{
  input: Types.DeleteTypeInput;
}>;


export type TestDeleteTypeMutation = { deleteType?: void | null | undefined };


export const TestDeleteTypeGql = `
    mutation TestDeleteType($input: DeleteTypeInput!) {
  deleteType(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeleteType(variables: TestDeleteTypeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeleteTypeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteTypeMutation>(TestDeleteTypeGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteType');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;