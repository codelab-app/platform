import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestUpdateElementPropsMutationVariables = Types.Exact<{
  input: Types.UpdateElementPropsInput;
}>;


export type TestUpdateElementPropsMutation = { updateElementProps?: void | null | undefined };


export const TestUpdateElementPropsGql = `
    mutation TestUpdateElementProps($input: UpdateElementPropsInput!) {
  updateElementProps(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateElementProps(variables: TestUpdateElementPropsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateElementPropsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateElementPropsMutation>(TestUpdateElementPropsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateElementProps');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;