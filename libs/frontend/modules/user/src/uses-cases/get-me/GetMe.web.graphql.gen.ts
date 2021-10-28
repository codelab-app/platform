import * as Types from '@codelab/shared/codegen/graphql';

import { __UserFragment } from '../../User.fragment.graphql.gen';
import { __UserFragmentDoc } from '../../User.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetMeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe?: __UserFragment | null | undefined };


export const GetMeGql = `
    query GetMe {
  getMe {
    ...__User
  }
}
    ${__UserFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetMe: build.query<GetMeQuery, GetMeQueryVariables | void>({
      query: (variables) => ({ document: GetMeGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetMeQuery, useLazyGetMeQuery } = injectedRtkApi;

