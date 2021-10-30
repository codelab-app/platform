import * as Types from '@codelab/shared/codegen/graphql';

import { AtomBaseFragment } from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { AtomBaseFragmentDoc } from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen';
export type TestCreateAtomMutationVariables = Types.Exact<{
  input: Types.CreateAtomInput;
}>;


export type TestCreateAtomMutation = { createAtom: AtomBaseFragment };


export const TestCreateAtomGql = `
    mutation TestCreateAtom($input: CreateAtomInput!) {
  createAtom(input: $input) {
    ...AtomBase
  }
}
    ${AtomBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateAtom(variables: TestCreateAtomMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreateAtomMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateAtomMutation>(TestCreateAtomGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateAtom');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;