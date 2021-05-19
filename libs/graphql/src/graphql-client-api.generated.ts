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
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CreateUserInput = {
  id?: Maybe<Scalars['String']>
  email: Scalars['String']
  name?: Maybe<Scalars['String']>
}

export type DeleteUsersInput = {
  ids: Array<Scalars['String']>
}

export type GetUsersInput = {
  userIds?: Maybe<Array<Scalars['String']>>
}

export type Mutation = {
  createUser: User
  updateUser: User
  deleteUsers: User
}

export type MutationCreateUserArgs = {
  upsert?: Maybe<Scalars['Boolean']>
  input: CreateUserInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationDeleteUsersArgs = {
  input: DeleteUsersInput
}

export type Query = {
  getMe: User
  getUsers: Array<User>
}

export type QueryGetUsersArgs = {
  input?: Maybe<GetUsersInput>
}

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>
  id: Scalars['String']
}

export type User = {
  id: Scalars['ID']
  email: Scalars['String']
  name: Scalars['String']
}

export type __UserFragment = Pick<User, 'id' | 'email' | 'name'>

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput
  upsert?: Maybe<Scalars['Boolean']>
}>

export type CreateUserMutation = { user: __UserFragment }

export type DeleteUsersMutationVariables = Exact<{
  input: DeleteUsersInput
}>

export type DeleteUsersMutation = { deleteUsers: Pick<User, 'id'> }

export type GetUsersQueryVariables = Exact<{
  input?: Maybe<GetUsersInput>
}>

export type GetUsersQuery = { users: Array<__UserFragment> }

export const __UserFragmentDoc = gql`
  fragment __User on User {
    id
    email
    name
  }
`
export const CreateUserGql = gql`
  mutation CreateUser($input: CreateUserInput!, $upsert: Boolean) {
    user: createUser(input: $input, upsert: $upsert) {
      ...__User
    }
  }
  ${__UserFragmentDoc}
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *      upsert: // value for 'upsert'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserGql,
    options,
  )
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const DeleteUsersGql = gql`
  mutation DeleteUsers($input: DeleteUsersInput!) {
    deleteUsers(input: $input) {
      id
    }
  }
`
export type DeleteUsersMutationFn = Apollo.MutationFunction<
  DeleteUsersMutation,
  DeleteUsersMutationVariables
>

/**
 * __useDeleteUsersMutation__
 *
 * To run a mutation, you first call `useDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsersMutation, { data, loading, error }] = useDeleteUsersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUsersMutation,
    DeleteUsersMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUsersMutation, DeleteUsersMutationVariables>(
    DeleteUsersGql,
    options,
  )
}
export type DeleteUsersMutationHookResult = ReturnType<
  typeof useDeleteUsersMutation
>
export type DeleteUsersMutationResult =
  Apollo.MutationResult<DeleteUsersMutation>
export type DeleteUsersMutationOptions = Apollo.BaseMutationOptions<
  DeleteUsersMutation,
  DeleteUsersMutationVariables
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
export const __User = gql`
  fragment __User on User {
    id
    email
    name
  }
`
export const CreateUser = gql`
  mutation CreateUser($input: CreateUserInput!, $upsert: Boolean) {
    user: createUser(input: $input, upsert: $upsert) {
      ...__User
    }
  }
  ${__User}
`
export const DeleteUsers = gql`
  mutation DeleteUsers($input: DeleteUsersInput!) {
    deleteUsers(input: $input) {
      id
    }
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
