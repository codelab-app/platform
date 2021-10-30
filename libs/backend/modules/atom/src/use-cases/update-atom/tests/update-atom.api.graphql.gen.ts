import * as Types from '@codelab/shared/codegen/graphql';

import { AtomBaseFragment } from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { AtomBaseFragmentDoc } from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen';
export type TestUpdateAtomMutationVariables = Types.Exact<{
  input: Types.UpdateAtomInput;
}>;


export type TestUpdateAtomMutation = { updateAtom?: AtomBaseFragment | null | undefined };


export const TestUpdateAtomGql = `
    mutation TestUpdateAtom($input: UpdateAtomInput!) {
  updateAtom(input: $input) {
    ...AtomBase
  }
}
    ${AtomBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateAtom(variables: TestUpdateAtomMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateAtomMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateAtomMutation>(TestUpdateAtomGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateAtom');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;