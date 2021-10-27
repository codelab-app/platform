import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type UpdateComponentMutationVariables = Types.Exact<{
  input: Types.UpdateComponentInput;
}>;


export type UpdateComponentMutation = { updateComponent?: void | null | undefined };


export const UpdateComponentGql = `
    mutation UpdateComponent($input: UpdateComponentInput!) {
  updateComponent(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateComponent: build.mutation<UpdateComponentMutation, UpdateComponentMutationVariables>({
      query: (variables) => ({ document: UpdateComponentGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateComponentMutation } = injectedRtkApi;

