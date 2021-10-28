import * as Types from '@codelab/shared/codegen/graphql';

import { ComponentFragment } from '../../Component.fragment.graphql.gen';
import { ComponentFragmentDoc } from '../../Component.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetComponentQueryVariables = Types.Exact<{
  input: Types.GetComponentInput;
}>;


export type GetComponentQuery = { getComponent?: ComponentFragment | null | undefined };


export const GetComponentGql = `
    query GetComponent($input: GetComponentInput!) {
  getComponent(input: $input) {
    ...Component
  }
}
    ${ComponentFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetComponent: build.query<GetComponentQuery, GetComponentQueryVariables>({
      query: (variables) => ({ document: GetComponentGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetComponentQuery, useLazyGetComponentQuery } = injectedRtkApi;

