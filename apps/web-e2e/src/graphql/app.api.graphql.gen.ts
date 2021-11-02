import * as Types from '@codelab/frontend/abstract/codegen'

import { AppBaseFragment } from '../../../../libs/frontend/modules/app/src/App.fragment.graphql.gen'
import { TestAppFragment } from '../../../../libs/backend/modules/app/src/test/test-app.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AppBaseFragmentDoc } from '../../../../libs/frontend/modules/app/src/App.fragment.graphql.gen'
import { TestAppFragmentDoc } from '../../../../libs/backend/modules/app/src/test/test-app.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type E2eCreateAppMutationVariables = Types.Exact<{
  input: Types.CreateAppInput
}>

export type E2eCreateAppMutation = { createApp: AppBaseFragment }

export type E2eDeleteAppMutationVariables = Types.Exact<{
  input: Types.DeleteAppInput
}>

export type E2eDeleteAppMutation = { deleteApp?: Types.Maybe<TestAppFragment> }

export const E2eCreateAppGql = gql`
  mutation E2eCreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      ...AppBase
    }
  }
  ${AppBaseFragmentDoc}
`
export type E2eCreateAppMutationFn = Apollo.MutationFunction<
  E2eCreateAppMutation,
  E2eCreateAppMutationVariables
>

/**
 * __useE2eCreateAppMutation__
 *
 * To run a mutation, you first call `useE2eCreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eCreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eCreateAppMutation, { data, loading, error }] = useE2eCreateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eCreateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eCreateAppMutation,
    E2eCreateAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eCreateAppMutation,
    E2eCreateAppMutationVariables
  >(E2eCreateAppGql, options)
}
export type E2eCreateAppMutationHookResult = ReturnType<
  typeof useE2eCreateAppMutation
>
export type E2eCreateAppMutationResult =
  Apollo.MutationResult<E2eCreateAppMutation>
export type E2eCreateAppMutationOptions = Apollo.BaseMutationOptions<
  E2eCreateAppMutation,
  E2eCreateAppMutationVariables
>
export const E2eDeleteAppGql = gql`
  mutation E2eDeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      ...TestApp
    }
  }
  ${TestAppFragmentDoc}
`
export type E2eDeleteAppMutationFn = Apollo.MutationFunction<
  E2eDeleteAppMutation,
  E2eDeleteAppMutationVariables
>

/**
 * __useE2eDeleteAppMutation__
 *
 * To run a mutation, you first call `useE2eDeleteAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eDeleteAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eDeleteAppMutation, { data, loading, error }] = useE2eDeleteAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eDeleteAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eDeleteAppMutation,
    E2eDeleteAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eDeleteAppMutation,
    E2eDeleteAppMutationVariables
  >(E2eDeleteAppGql, options)
}
export type E2eDeleteAppMutationHookResult = ReturnType<
  typeof useE2eDeleteAppMutation
>
export type E2eDeleteAppMutationResult =
  Apollo.MutationResult<E2eDeleteAppMutation>
export type E2eDeleteAppMutationOptions = Apollo.BaseMutationOptions<
  E2eDeleteAppMutation,
  E2eDeleteAppMutationVariables
>
