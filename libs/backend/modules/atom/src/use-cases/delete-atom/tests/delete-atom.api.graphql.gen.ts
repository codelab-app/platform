import * as Types from '@codelab/shared/codegen/graphql';

import { AtomBaseFragment } from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { AtomBaseFragmentDoc } from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen';
export type TestDeleteAtomMutationVariables = Types.Exact<{
  input: Types.DeleteAtomInput;
}>;


export type TestDeleteAtomMutation = { deleteAtom?: AtomBaseFragment | null | undefined };


export const TestDeleteAtomGql = `
    mutation TestDeleteAtom($input: DeleteAtomInput!) {
  deleteAtom(input: $input) {
    ...AtomBase
  }
}
    ${AtomBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeleteAtom(variables: TestDeleteAtomMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeleteAtomMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteAtomMutation>(TestDeleteAtomGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteAtom');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;