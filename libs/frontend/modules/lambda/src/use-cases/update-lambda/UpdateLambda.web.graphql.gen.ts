import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type UpdateLambdaMutationVariables = Types.Exact<{
  input: Types.UpdateLambdaInput;
}>;


export type UpdateLambdaMutation = { updateLambda?: void | null | undefined };


export const UpdateLambdaGql = `
    mutation UpdateLambda($input: UpdateLambdaInput!) {
  updateLambda(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateLambda: build.mutation<UpdateLambdaMutation, UpdateLambdaMutationVariables>({
      query: (variables) => ({ document: UpdateLambdaGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateLambdaMutation } = injectedRtkApi;

