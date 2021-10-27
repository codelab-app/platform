import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type ExecuteLambdaForStateMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput;
}>;


export type ExecuteLambdaForStateMutation = { executeLambda?: { payload: string } | null | undefined };


export const ExecuteLambdaForStateGql = `
    mutation ExecuteLambdaForState($input: ExecuteLambdaInput!) {
  executeLambda(input: $input) {
    payload
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ExecuteLambdaForState: build.mutation<ExecuteLambdaForStateMutation, ExecuteLambdaForStateMutationVariables>({
      query: (variables) => ({ document: ExecuteLambdaForStateGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useExecuteLambdaForStateMutation } = injectedRtkApi;

