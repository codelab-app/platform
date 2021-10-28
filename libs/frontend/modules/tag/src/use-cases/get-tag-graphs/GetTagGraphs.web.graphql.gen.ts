import * as Types from '@codelab/shared/codegen/graphql';

import { TagGraphFragment } from '../Tag.fragment.graphql.gen';
import { TagGraphFragmentDoc } from '../Tag.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetTagGraphsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTagGraphsQuery = { getTagGraphs: TagGraphFragment };


export const GetTagGraphsGql = `
    query GetTagGraphs {
  getTagGraphs {
    ...TagGraph
  }
}
    ${TagGraphFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetTagGraphs: build.query<GetTagGraphsQuery, GetTagGraphsQueryVariables | void>({
      query: (variables) => ({ document: GetTagGraphsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetTagGraphsQuery, useLazyGetTagGraphsQuery } = injectedRtkApi;

