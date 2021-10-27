import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type UpdateFieldMutationVariables = Types.Exact<{
  input: Types.UpdateFieldInput;
}>;


export type UpdateFieldMutation = { updateField?: void | null | undefined };


export const UpdateFieldGql = `
    mutation UpdateField($input: UpdateFieldInput!) {
  updateField(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateField: build.mutation<UpdateFieldMutation, UpdateFieldMutationVariables>({
      query: (variables) => ({ document: UpdateFieldGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateFieldMutation } = injectedRtkApi;

