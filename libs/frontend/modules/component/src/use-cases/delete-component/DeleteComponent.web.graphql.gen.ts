import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type DeleteComponentMutationVariables = Types.Exact<{
  input: Types.DeleteComponentInput;
}>;


export type DeleteComponentMutation = { deleteComponent?: void | null | undefined };


export const DeleteComponentGql = `
    mutation DeleteComponent($input: DeleteComponentInput!) {
  deleteComponent(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteComponent: build.mutation<DeleteComponentMutation, DeleteComponentMutationVariables>({
      query: (variables) => ({ document: DeleteComponentGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteComponentMutation } = injectedRtkApi;

