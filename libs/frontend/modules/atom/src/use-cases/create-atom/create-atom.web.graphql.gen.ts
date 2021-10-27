import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type CreateAtomMutationVariables = Types.Exact<{
  input: Types.CreateAtomInput;
}>;


export type CreateAtomMutation = { createAtom: { id: string } };


export const CreateAtomGql = `
    mutation CreateAtom($input: CreateAtomInput!) {
  createAtom(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateAtom: build.mutation<CreateAtomMutation, CreateAtomMutationVariables>({
      query: (variables) => ({ document: CreateAtomGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateAtomMutation } = injectedRtkApi;

