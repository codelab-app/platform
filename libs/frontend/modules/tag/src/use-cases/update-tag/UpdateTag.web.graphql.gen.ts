import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type UpdateTagMutationVariables = Types.Exact<{
  input: Types.UpdateTagInput;
}>;


export type UpdateTagMutation = { updateTag?: void | null | undefined };


export const UpdateTagGql = `
    mutation UpdateTag($input: UpdateTagInput!) {
  updateTag(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateTag: build.mutation<UpdateTagMutation, UpdateTagMutationVariables>({
      query: (variables) => ({ document: UpdateTagGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateTagMutation } = injectedRtkApi;

