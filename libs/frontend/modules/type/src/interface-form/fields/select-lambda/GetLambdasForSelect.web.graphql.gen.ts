import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type GetLambdasForSelectQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLambdasForSelectQuery = { getLambdas: Array<{ id: string, name: string }> };


export const GetLambdasForSelectGql = `
    query GetLambdasForSelect {
  getLambdas {
    id
    name
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetLambdasForSelect: build.query<GetLambdasForSelectQuery, GetLambdasForSelectQueryVariables | void>({
      query: (variables) => ({ document: GetLambdasForSelectGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetLambdasForSelectQuery, useLazyGetLambdasForSelectQuery } = injectedRtkApi;

