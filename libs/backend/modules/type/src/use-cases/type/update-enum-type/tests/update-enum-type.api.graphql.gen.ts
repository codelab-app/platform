import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpdateEnumTypeMutationVariables = Types.Exact<{
  input: Types.UpdateEnumTypeInput;
}>;


export type TestUpdateEnumTypeMutation = { updateEnumType?: void | null | undefined };


export const TestUpdateEnumTypeGql = `
    mutation TestUpdateEnumType($input: UpdateEnumTypeInput!) {
  updateEnumType(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateEnumType(variables: TestUpdateEnumTypeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateEnumTypeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateEnumTypeMutation>(TestUpdateEnumTypeGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateEnumType');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;