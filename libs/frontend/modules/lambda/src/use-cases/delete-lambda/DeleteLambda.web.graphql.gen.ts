import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type DeleteLambdaMutationVariables = Types.Exact<{
  input: Types.DeleteLambdaInput;
}>;


export type DeleteLambdaMutation = { deleteLambda?: void | null | undefined };


export const DeleteLambdaGql = `
    mutation DeleteLambda($input: DeleteLambdaInput!) {
  deleteLambda(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteLambda: build.mutation<DeleteLambdaMutation, DeleteLambdaMutationVariables>({
      query: (variables) => ({ document: DeleteLambdaGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteLambdaMutation } = injectedRtkApi;

