import * as Types from '@codelab/shared/codegen/graphql';

import { __UserFragment } from '../../User.fragment.graphql.gen';
import { __UserFragmentDoc } from '../../User.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetUsersQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetUsersInput>;
}>;


export type GetUsersQuery = { users: Array<__UserFragment> };


export const GetUsersGql = `
    query GetUsers($input: GetUsersInput) {
  users: getUsers(input: $input) {
    ...__User
  }
}
    ${__UserFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetUsers: build.query<GetUsersQuery, GetUsersQueryVariables | void>({
      query: (variables) => ({ document: GetUsersGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUsersQuery, useLazyGetUsersQuery } = injectedRtkApi;

