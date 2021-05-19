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

export type DeleteUserInput = {
  id: Scalars['String']
}

export type Mutation = {
  createUser: User
  updateUser: User
  deleteUser: User
}

export type MutationCreateUserArgs = {
  upsert?: Maybe<Scalars['Boolean']>
  input: CreateUserInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type Query = {
  getMe: User
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
