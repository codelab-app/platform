import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type CreateTypeMutationVariables = Types.Exact<{
  input: Types.CreateTypeInput;
}>;


export type CreateTypeMutation = { createType: { id: string } };


export const CreateTypeGql = `
    mutation CreateType($input: CreateTypeInput!) {
  createType(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateType: build.mutation<CreateTypeMutation, CreateTypeMutationVariables>({
      query: (variables) => ({ document: CreateTypeGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateTypeMutation } = injectedRtkApi;

