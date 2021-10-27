import * as Types from '@codelab/shared/codegen/graphql';

import { TagFragment, TagEdgeFragment } from '../Tag.fragment.graphql.gen';
import { TagFragmentDoc, TagEdgeFragmentDoc } from '../Tag.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type GetTagsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { getTags: Array<TagFragment> };


export const GetTagsGql = `
    query GetTags {
  getTags {
    ...Tag
  }
}
    ${TagFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetTags: build.query<GetTagsQuery, GetTagsQueryVariables | void>({
      query: (variables) => ({ document: GetTagsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetTagsQuery, useLazyGetTagsQuery } = injectedRtkApi;

