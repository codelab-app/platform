import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type DeleteUserMutationVariables = Types.Exact<{
  input: Types.DeleteUserInput;
}>;


export type DeleteUserMutation = { deleteUser: boolean };


export const DeleteUserGql = `
    mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteUser: build.mutation<DeleteUserMutation, DeleteUserMutationVariables>({
      query: (variables) => ({ document: DeleteUserGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteUserMutation } = injectedRtkApi;

