import * as Types from '@codelab/shared/codegen/graphql';

import { TypeGraphFragment } from '../../../graphql/TypeGraph.fragment.graphql.gen';
import { TypeGraphFragmentDoc } from '../../../graphql/TypeGraph.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type GetTypeGraphQueryVariables = Types.Exact<{
  input: Types.GetTypeInput;
}>;


export type GetTypeGraphQuery = { getTypeGraph?: TypeGraphFragment | null | undefined };


export const GetTypeGraphGql = `
    query GetTypeGraph($input: GetTypeInput!) {
  getTypeGraph(input: $input) {
    ...TypeGraph
  }
}
    ${TypeGraphFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetTypeGraph: build.query<GetTypeGraphQuery, GetTypeGraphQueryVariables>({
      query: (variables) => ({ document: GetTypeGraphGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetTypeGraphQuery, useLazyGetTypeGraphQuery } = injectedRtkApi;

