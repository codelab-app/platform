import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type DeleteFieldMutationVariables = Types.Exact<{
  input: Types.DeleteFieldInput;
}>;


export type DeleteFieldMutation = { deleteField?: void | null | undefined };


export const DeleteFieldGql = `
    mutation DeleteField($input: DeleteFieldInput!) {
  deleteField(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteField: build.mutation<DeleteFieldMutation, DeleteFieldMutationVariables>({
      query: (variables) => ({ document: DeleteFieldGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteFieldMutation } = injectedRtkApi;

