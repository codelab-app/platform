import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type GetLambdaNameQueryVariables = Types.Exact<{
  input: Types.GetLambdaInput;
}>;


export type GetLambdaNameQuery = { getLambda?: { name: string } | null | undefined };


export const GetLambdaNameGql = `
    query GetLambdaName($input: GetLambdaInput!) {
  getLambda(input: $input) {
    name
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetLambdaName: build.query<GetLambdaNameQuery, GetLambdaNameQueryVariables>({
      query: (variables) => ({ document: GetLambdaNameGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetLambdaNameQuery, useLazyGetLambdaNameQuery } = injectedRtkApi;

