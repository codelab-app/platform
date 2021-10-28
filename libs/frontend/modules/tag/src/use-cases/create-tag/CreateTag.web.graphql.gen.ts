import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type CreateTagMutationVariables = Types.Exact<{
  input: Types.CreateTagInput;
}>;


export type CreateTagMutation = { createTag: { id: string } };


export const CreateTagGql = `
    mutation CreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateTag: build.mutation<CreateTagMutation, CreateTagMutationVariables>({
      query: (variables) => ({ document: CreateTagGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateTagMutation } = injectedRtkApi;

