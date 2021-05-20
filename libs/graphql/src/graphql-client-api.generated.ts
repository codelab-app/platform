import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = { operationName: 'api' }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type App = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  name: Scalars['String']
}

export type CreateAppInput = {
  name: Scalars['String']
}

export type DeleteUserInput = {
  userId: Scalars['String']
}

export type GetUsersInput = {
  page: Scalars['Int']
  perPage: Scalars['Int']
  query: Scalars['String']
  sort: Scalars['String']
}

export type Mutation = {
  updateUser: User
  deleteUser: Scalars['Boolean']
  createApp: App
  updateApp: App
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationCreateAppArgs = {
  input: CreateAppInput
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type Query = {
  getMe: User
  getUsers: Array<User>
  getApps: Array<App>
}

export type QueryGetUsersArgs = {
  input?: Maybe<GetUsersInput>
}

export type UpdateAppInput = {
  name?: Maybe<Scalars['String']>
  appId: Scalars['String']
}

export type UpdateUserData = {
  family_name?: Maybe<Scalars['String']>
  given_name?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  phone_number?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
  userId: Scalars['String']
  updateData: UpdateUserData
}

export type User = {
  blocked?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_verified?: Maybe<Scalars['Boolean']>
  family_name?: Maybe<Scalars['String']>
  given_name?: Maybe<Scalars['String']>
  last_ip?: Maybe<Scalars['String']>
  last_login?: Maybe<Scalars['String']>
  last_password_reset?: Maybe<Scalars['String']>
  logins_count?: Maybe<Scalars['Float']>
  multifactor?: Maybe<Array<Scalars['String']>>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  phone_number?: Maybe<Scalars['String']>
  phone_verified?: Maybe<Scalars['Boolean']>
  picture?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type __AppFragment = Pick<App, 'id' | 'name'>

export type __UserFragment = Pick<User, 'email' | 'name'> & {
  id: User['user_id']
}

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput
}>

export type DeleteUserMutation = Pick<Mutation, 'deleteUser'>

export type GetUsersQueryVariables = Exact<{
  input?: Maybe<GetUsersInput>
}>

export type GetUsersQuery = { users: Array<__UserFragment> }

export const __AppFragmentDoc = gql`
  fragment __App on App {
    id
    name
  }
`
export const __UserFragmentDoc = gql`
  fragment __User on User {
    id: user_id
    email
    name
  }
`
export const DeleteUserGql = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserGql,
    options,
  )
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const GetUsersGql = gql`
  query GetUsers($input: GetUsersInput) {
    users: getUsers(input: $input) {
      ...__User
    }
  }
  ${__UserFragmentDoc}
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersGql,
    options,
  )
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersGql,
    options,
  )
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
  return { query: GetUsersGql, variables: variables }
}
export const __App = gql`
  fragment __App on App {
    id
    name
  }
`
export const __User = gql`
  fragment __User on User {
    id: user_id
    email
    name
  }
`
export const DeleteUser = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`
export const GetUsers = gql`
  query GetUsers($input: GetUsersInput) {
    users: getUsers(input: $input) {
      ...__User
    }
  }
  ${__User}
`
