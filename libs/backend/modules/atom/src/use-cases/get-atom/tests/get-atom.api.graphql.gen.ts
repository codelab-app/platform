import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetAtomQueryVariables = Types.Exact<{
  input: Types.GetAtomInput;
}>;


export type TestGetAtomQuery = { atom?: { id: string, name: string, type: Types.AtomType, api: { id: string } } | null | undefined };


export const TestGetAtomGql = `
    query TestGetAtom($input: GetAtomInput!) {
  atom: getAtom(input: $input) {
    id
    api {
      id
    }
    name
    type
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetAtom(variables: TestGetAtomQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetAtomQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetAtomQuery>(TestGetAtomGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetAtom');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;