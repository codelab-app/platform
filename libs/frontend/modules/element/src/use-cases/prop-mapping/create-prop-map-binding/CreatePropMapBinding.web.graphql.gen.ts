import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type CreatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.CreatePropMapBindingInput;
}>;


export type CreatePropMapBindingMutation = { createPropMapBinding: { id: string } };


export const CreatePropMapBindingGql = `
    mutation CreatePropMapBinding($input: CreatePropMapBindingInput!) {
  createPropMapBinding(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreatePropMapBinding: build.mutation<CreatePropMapBindingMutation, CreatePropMapBindingMutationVariables>({
      query: (variables) => ({ document: CreatePropMapBindingGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreatePropMapBindingMutation } = injectedRtkApi;

