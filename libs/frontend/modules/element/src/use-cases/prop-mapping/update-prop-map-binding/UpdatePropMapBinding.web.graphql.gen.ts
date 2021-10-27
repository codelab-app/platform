import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type UpdatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.UpdatePropMapBindingInput;
}>;


export type UpdatePropMapBindingMutation = { updatePropMapBinding?: void | null | undefined };


export const UpdatePropMapBindingGql = `
    mutation UpdatePropMapBinding($input: UpdatePropMapBindingInput!) {
  updatePropMapBinding(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdatePropMapBinding: build.mutation<UpdatePropMapBindingMutation, UpdatePropMapBindingMutationVariables>({
      query: (variables) => ({ document: UpdatePropMapBindingGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdatePropMapBindingMutation } = injectedRtkApi;

