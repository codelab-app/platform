import * as Types from '@codelab/frontend/abstract/codegen'

import { __UserFragment } from './User.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { __UserFragmentDoc } from './User.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type DeleteUserMutationVariables = Types.Exact<{
  input: Types.DeleteUserInput
}>

export type DeleteUserMutation = { deleteUser: boolean }

export type GetMeQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetMeQuery = { getMe?: __UserFragment | null | undefined }

export type GetUsersQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetUsersInput>
}>

export type GetUsersQuery = { users: Array<__UserFragment> }

export const DeleteUserGql = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`
export const GetMeGql = gql`
  query GetMe {
    getMe {
      ...__User
    }
  }
  ${__UserFragmentDoc}
`
export const GetUsersGql = gql`
  query GetUsers($input: GetUsersInput) {
    users: getUsers(input: $input) {
      ...__User
    }
  }
  ${__UserFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteUser: build.mutation<
      DeleteUserMutation,
      GraphqlOperationOptions<DeleteUserMutationVariables>
    >({
      query: (options) => ({
        document: DeleteUserGql,
        options: options ?? undefined,
      }),
    }),
    GetMe: build.query<
      GetMeQuery,
      GraphqlOperationOptions<GetMeQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetMeGql,
        options: options ?? undefined,
      }),
    }),
    GetUsers: build.query<
      GetUsersQuery,
      GraphqlOperationOptions<GetUsersQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetUsersGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useDeleteUserMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = injectedRtkApi
