import * as Types from '@codelab/shared/codegen/graphql';

import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen';
import { LambdaFragmentDoc } from '../../graphql/Lambda.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetLambdaQueryVariables = Types.Exact<{
  input: Types.GetLambdaInput;
}>;


export type GetLambdaQuery = { getLambda?: LambdaFragment | null | undefined };


export const GetLambdaGql = `
    query GetLambda($input: GetLambdaInput!) {
  getLambda(input: $input) {
    ...Lambda
  }
}
    ${LambdaFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetLambda: build.query<GetLambdaQuery, GetLambdaQueryVariables>({
      query: (variables) => ({ document: GetLambdaGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetLambdaQuery, useLazyGetLambdaQuery } = injectedRtkApi;

