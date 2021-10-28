import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type CreateComponentMutationVariables = Types.Exact<{
  input: Types.CreateComponentInput;
}>;


export type CreateComponentMutation = { createComponent: { id: string } };


export const CreateComponentGql = `
    mutation CreateComponent($input: CreateComponentInput!) {
  createComponent(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateComponent: build.mutation<CreateComponentMutation, CreateComponentMutationVariables>({
      query: (variables) => ({ document: CreateComponentGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateComponentMutation } = injectedRtkApi;

