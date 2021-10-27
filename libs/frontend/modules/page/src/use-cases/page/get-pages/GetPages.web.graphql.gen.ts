import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from '../../../graphql/PageBase.fragment.graphql.gen';
import { PageBaseFragmentDoc } from '../../../graphql/PageBase.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type GetPagesQueryVariables = Types.Exact<{
  input: Types.GetPagesInput;
}>;


export type GetPagesQuery = { pages: Array<PageBaseFragment> };


export const GetPagesGql = `
    query GetPages($input: GetPagesInput!) {
  pages: getPages(input: $input) {
    ...PageBase
  }
}
    ${PageBaseFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetPages: build.query<GetPagesQuery, GetPagesQueryVariables>({
      query: (variables) => ({ document: GetPagesGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetPagesQuery, useLazyGetPagesQuery } = injectedRtkApi;

