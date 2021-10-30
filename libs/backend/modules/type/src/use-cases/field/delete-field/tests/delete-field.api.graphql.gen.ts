import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestDeleteFieldMutationVariables = Types.Exact<{
  input: Types.DeleteFieldInput;
}>;


export type TestDeleteFieldMutation = { deleteField?: void | null | undefined };


export const TestDeleteFieldGql = `
    mutation TestDeleteField($input: DeleteFieldInput!) {
  deleteField(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeleteField(variables: TestDeleteFieldMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeleteFieldMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteFieldMutation>(TestDeleteFieldGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteField');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;