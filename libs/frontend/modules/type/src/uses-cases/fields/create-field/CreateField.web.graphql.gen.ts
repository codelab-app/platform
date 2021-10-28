import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type CreateFieldMutationVariables = Types.Exact<{
  input: Types.CreateFieldInput;
}>;


export type CreateFieldMutation = { createField: { id: string } };


export const CreateFieldGql = `
    mutation CreateField($input: CreateFieldInput!) {
  createField(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateField: build.mutation<CreateFieldMutation, CreateFieldMutationVariables>({
      query: (variables) => ({ document: CreateFieldGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateFieldMutation } = injectedRtkApi;

