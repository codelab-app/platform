import * as Types from '@codelab/shared/codegen/graphql';

import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen';
import { LambdaFragmentDoc } from '../../graphql/Lambda.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetLambdasQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLambdasQuery = { getLambdas: Array<LambdaFragment> };


export const GetLambdasGql = `
    query GetLambdas {
  getLambdas {
    ...Lambda
  }
}
    ${LambdaFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetLambdas: build.query<GetLambdasQuery, GetLambdasQueryVariables | void>({
      query: (variables) => ({ document: GetLambdasGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetLambdasQuery, useLazyGetLambdasQuery } = injectedRtkApi;

