import * as Types from '@codelab/shared/codegen/graphql';

import { PageFullFragment } from '../../../graphql/PageFull.fragment.graphql.gen';
import { PageFullFragmentDoc } from '../../../graphql/PageFull.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetPageQueryVariables = Types.Exact<{
  input: Types.GetPageInput;
}>;


export type GetPageQuery = { page?: PageFullFragment | null | undefined };


export const GetPageGql = `
    query GetPage($input: GetPageInput!) {
  page: getPage(input: $input) {
    ...PageFull
  }
}
    ${PageFullFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetPage: build.query<GetPageQuery, GetPageQueryVariables>({
      query: (variables) => ({ document: GetPageGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetPageQuery, useLazyGetPageQuery } = injectedRtkApi;

