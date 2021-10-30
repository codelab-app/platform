import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestGetAtomsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetAtomsInput>;
}>;


export type TestGetAtomsQuery = { getAtoms?: Array<{ id: string, name: string, type: Types.AtomType, api: { id: string } }> | null | undefined };


export const TestGetAtomsGql = `
    query TestGetAtoms($input: GetAtomsInput) {
  getAtoms(input: $input) {
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
    TestGetAtoms(variables?: TestGetAtomsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetAtomsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetAtomsQuery>(TestGetAtomsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetAtoms');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;