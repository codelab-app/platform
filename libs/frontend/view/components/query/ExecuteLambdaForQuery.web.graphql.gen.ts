import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type ExecuteLambdaForQueryMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput;
}>;


export type ExecuteLambdaForQueryMutation = { executeLambda?: { payload: string } | null | undefined };


export const ExecuteLambdaForQueryGql = `
    mutation ExecuteLambdaForQuery($input: ExecuteLambdaInput!) {
  executeLambda(input: $input) {
    payload
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ExecuteLambdaForQuery: build.mutation<ExecuteLambdaForQueryMutation, ExecuteLambdaForQueryMutationVariables>({
      query: (variables) => ({ document: ExecuteLambdaForQueryGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useExecuteLambdaForQueryMutation } = injectedRtkApi;

