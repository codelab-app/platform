import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type DeleteElementMutationVariables = Types.Exact<{
  input: Types.DeleteElementInput;
}>;


export type DeleteElementMutation = { deleteElement?: void | null | undefined };


export const DeleteElementGql = `
    mutation DeleteElement($input: DeleteElementInput!) {
  deleteElement(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteElement: build.mutation<DeleteElementMutation, DeleteElementMutationVariables>({
      query: (variables) => ({ document: DeleteElementGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteElementMutation } = injectedRtkApi;

