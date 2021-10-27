import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type AtomForSelectFragment = { id: string, name: string };

export type GetAtomsForSelectQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAtomsForSelectQuery = { getAtoms?: Array<AtomForSelectFragment> | null | undefined };

export const AtomForSelectFragmentDoc = `
    fragment AtomForSelect on Atom {
  id
  name
}
    `;
export const GetAtomsForSelectGql = `
    query GetAtomsForSelect {
  getAtoms {
    ...AtomForSelect
  }
}
    ${AtomForSelectFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetAtomsForSelect: build.query<GetAtomsForSelectQuery, GetAtomsForSelectQueryVariables | void>({
      query: (variables) => ({ document: GetAtomsForSelectGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetAtomsForSelectQuery, useLazyGetAtomsForSelectQuery } = injectedRtkApi;

