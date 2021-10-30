import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpdateFieldMutationVariables = Types.Exact<{
  input: Types.UpdateFieldInput;
}>;


export type TestUpdateFieldMutation = { updateField?: void | null | undefined };


export const TestUpdateFieldGql = `
    mutation TestUpdateField($input: UpdateFieldInput!) {
  updateField(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateField(variables: TestUpdateFieldMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateFieldMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateFieldMutation>(TestUpdateFieldGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateField');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;