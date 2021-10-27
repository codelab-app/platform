import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type DeletePropMapBindingMutationVariables = Types.Exact<{
  input: Types.DeletePropMapBindingInput;
}>;


export type DeletePropMapBindingMutation = { deletePropMapBinding?: void | null | undefined };


export const DeletePropMapBindingGql = `
    mutation DeletePropMapBinding($input: DeletePropMapBindingInput!) {
  deletePropMapBinding(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeletePropMapBinding: build.mutation<DeletePropMapBindingMutation, DeletePropMapBindingMutationVariables>({
      query: (variables) => ({ document: DeletePropMapBindingGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeletePropMapBindingMutation } = injectedRtkApi;

