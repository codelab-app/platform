import * as Types from '@codelab/shared/codegen/graphql';

import { AtomFragment } from '../../Atom.fragment.graphql.gen';
import { AtomFragmentDoc } from '../../Atom.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetAtomQueryVariables = Types.Exact<{
  input: Types.GetAtomInput;
}>;


export type GetAtomQuery = { getAtom?: AtomFragment | null | undefined };


export const GetAtomGql = `
    query GetAtom($input: GetAtomInput!) {
  getAtom(input: $input) {
    ...Atom
  }
}
    ${AtomFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetAtom: build.query<GetAtomQuery, GetAtomQueryVariables>({
      query: (variables) => ({ document: GetAtomGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetAtomQuery, useLazyGetAtomQuery } = injectedRtkApi;

