import * as Types from '@codelab/shared/codegen/graphql';

import { AtomBaseFragment } from '../../Atom.fragment.graphql.gen';
import { AtomBaseFragmentDoc } from '../../Atom.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type DeleteAtomMutationVariables = Types.Exact<{
  input: Types.DeleteAtomInput;
}>;


export type DeleteAtomMutation = { deleteAtom?: AtomBaseFragment | null | undefined };


export const DeleteAtomGql = `
    mutation DeleteAtom($input: DeleteAtomInput!) {
  deleteAtom(input: $input) {
    ...AtomBase
  }
}
    ${AtomBaseFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteAtom: build.mutation<DeleteAtomMutation, DeleteAtomMutationVariables>({
      query: (variables) => ({ document: DeleteAtomGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteAtomMutation } = injectedRtkApi;

