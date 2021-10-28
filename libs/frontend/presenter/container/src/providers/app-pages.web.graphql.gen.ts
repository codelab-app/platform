import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type AppPages__AppFragment = { id: string, name: string, pages: Array<{ id: string, name: string }> };

export type AppPagesQueryVariables = Types.Exact<{
  input: Types.GetAppInput;
}>;


export type AppPagesQuery = { app?: AppPages__AppFragment | null | undefined };

export const AppPages__AppFragmentDoc = `
    fragment AppPages__App on App {
  id
  name
  pages {
    id
    name
  }
}
    `;
export const AppPagesGql = `
    query AppPages($input: GetAppInput!) {
  app: getApp(input: $input) {
    ...AppPages__App
  }
}
    ${AppPages__AppFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    AppPages: build.query<AppPagesQuery, AppPagesQueryVariables>({
      query: (variables) => ({ document: AppPagesGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAppPagesQuery, useLazyAppPagesQuery } = injectedRtkApi;

