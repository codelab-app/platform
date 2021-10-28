import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type ComponentForSelectFragment = { id: string, name: string };

export type GetComponentsForSelectQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetComponentsForSelectQuery = { getComponents: Array<ComponentForSelectFragment> };

export const ComponentForSelectFragmentDoc = `
    fragment ComponentForSelect on Component {
  id
  name
}
    `;
export const GetComponentsForSelectGql = `
    query GetComponentsForSelect {
  getComponents {
    ...ComponentForSelect
  }
}
    ${ComponentForSelectFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetComponentsForSelect: build.query<GetComponentsForSelectQuery, GetComponentsForSelectQueryVariables | void>({
      query: (variables) => ({ document: GetComponentsForSelectGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetComponentsForSelectQuery, useLazyGetComponentsForSelectQuery } = injectedRtkApi;

