import * as Types from '@codelab/shared/codegen/graphql';

import { AtomBaseFragment } from '../../Atom.fragment.graphql.gen';
import { AtomBaseFragmentDoc } from '../../Atom.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type UpdateAtomMutationVariables = Types.Exact<{
  input: Types.UpdateAtomInput;
}>;


export type UpdateAtomMutation = { updateAtom?: AtomBaseFragment | null | undefined };


export const UpdateAtomGql = `
    mutation UpdateAtom($input: UpdateAtomInput!) {
  updateAtom(input: $input) {
    ...AtomBase
  }
}
    ${AtomBaseFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateAtom: build.mutation<UpdateAtomMutation, UpdateAtomMutationVariables>({
      query: (variables) => ({ document: UpdateAtomGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateAtomMutation } = injectedRtkApi;

