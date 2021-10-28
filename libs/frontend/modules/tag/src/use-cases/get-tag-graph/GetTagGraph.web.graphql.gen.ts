import * as Types from '@codelab/shared/codegen/graphql';

import { TagGraphFragment } from '../Tag.fragment.graphql.gen';
import { TagGraphFragmentDoc } from '../Tag.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetTagGraphQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTagGraphQuery = { getTagGraph?: TagGraphFragment | null | undefined };


export const GetTagGraphGql = `
    query GetTagGraph {
  getTagGraph {
    ...TagGraph
  }
}
    ${TagGraphFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetTagGraph: build.query<GetTagGraphQuery, GetTagGraphQueryVariables | void>({
      query: (variables) => ({ document: GetTagGraphGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetTagGraphQuery, useLazyGetTagGraphQuery } = injectedRtkApi;

