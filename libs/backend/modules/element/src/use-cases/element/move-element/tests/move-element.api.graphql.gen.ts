import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestMoveElementMutationVariables = Types.Exact<{
  input: Types.MoveElementInput;
}>;


export type TestMoveElementMutation = { moveElement?: void | null | undefined };


export const TestMoveElementGql = `
    mutation TestMoveElement($input: MoveElementInput!) {
  moveElement(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestMoveElement(variables: TestMoveElementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestMoveElementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestMoveElementMutation>(TestMoveElementGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestMoveElement');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;