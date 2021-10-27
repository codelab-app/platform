import * as Types from '@codelab/shared/codegen/graphql';

import { ComponentFragment } from '../../Component.fragment.graphql.gen';
import { ComponentFragmentDoc } from '../../Component.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type GetComponentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetComponentsQuery = { getComponents: Array<ComponentFragment> };


export const GetComponentsGql = `
    query GetComponents {
  getComponents {
    ...Component
  }
}
    ${ComponentFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetComponents: build.query<GetComponentsQuery, GetComponentsQueryVariables | void>({
      query: (variables) => ({ document: GetComponentsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetComponentsQuery, useLazyGetComponentsQuery } = injectedRtkApi;

