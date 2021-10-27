import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type CreateLambdaMutationVariables = Types.Exact<{
  input: Types.CreateLambdaInput;
}>;


export type CreateLambdaMutation = { createLambda: { id: string } };


export const CreateLambdaGql = `
    mutation CreateLambda($input: CreateLambdaInput!) {
  createLambda(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateLambda: build.mutation<CreateLambdaMutation, CreateLambdaMutationVariables>({
      query: (variables) => ({ document: CreateLambdaGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateLambdaMutation } = injectedRtkApi;

