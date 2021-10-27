import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type DeleteTypeMutationVariables = Types.Exact<{
  input: Types.DeleteTypeInput;
}>;


export type DeleteTypeMutation = { deleteType?: void | null | undefined };


export const DeleteTypeGql = `
    mutation DeleteType($input: DeleteTypeInput!) {
  deleteType(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteType: build.mutation<DeleteTypeMutation, DeleteTypeMutationVariables>({
      query: (variables) => ({ document: DeleteTypeGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteTypeMutation } = injectedRtkApi;

