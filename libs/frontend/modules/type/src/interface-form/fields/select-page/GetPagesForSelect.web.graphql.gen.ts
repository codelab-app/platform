import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type GetPagesForSelectQueryVariables = Types.Exact<{
  input: Types.GetPagesInput;
}>;


export type GetPagesForSelectQuery = { pages: Array<{ id: string, name: string }> };


export const GetPagesForSelectGql = `
    query GetPagesForSelect($input: GetPagesInput!) {
  pages: getPages(input: $input) {
    id
    name
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetPagesForSelect: build.query<GetPagesForSelectQuery, GetPagesForSelectQueryVariables>({
      query: (variables) => ({ document: GetPagesForSelectGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetPagesForSelectQuery, useLazyGetPagesForSelectQuery } = injectedRtkApi;

