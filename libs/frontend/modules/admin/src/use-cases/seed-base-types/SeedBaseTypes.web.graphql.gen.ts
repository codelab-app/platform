import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type SeedBaseTypesMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SeedBaseTypesMutation = { seedBaseTypes?: void | null | undefined };


export const SeedBaseTypesGql = `
    mutation SeedBaseTypes {
  seedBaseTypes
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    SeedBaseTypes: build.mutation<SeedBaseTypesMutation, SeedBaseTypesMutationVariables | void>({
      query: (variables) => ({ document: SeedBaseTypesGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSeedBaseTypesMutation } = injectedRtkApi;

