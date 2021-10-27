import * as Types from '@codelab/shared/codegen/graphql';

import { AtomFragment } from '../../Atom.fragment.graphql.gen';
import { AtomFragmentDoc } from '../../Atom.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type GetAtomsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetAtomsInput>;
}>;


export type GetAtomsQuery = { getAtoms?: Array<AtomFragment> | null | undefined };


export const GetAtomsGql = `
    query GetAtoms($input: GetAtomsInput) {
  getAtoms(input: $input) {
    ...Atom
  }
}
    ${AtomFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetAtoms: build.query<GetAtomsQuery, GetAtomsQueryVariables | void>({
      query: (variables) => ({ document: GetAtomsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetAtomsQuery, useLazyGetAtomsQuery } = injectedRtkApi;

