import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestCreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput
}>

export type TestCreatePageMutation = { createPage: { id: string } }

export const TestCreatePageGql = gql`
  mutation TestCreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      id
    }
  }
`
export type TestCreatePageMutationFn = Apollo.MutationFunction<
  TestCreatePageMutation,
  TestCreatePageMutationVariables
>

/**
 * __useTestCreatePageMutation__
 *
 * To run a mutation, you first call `useTestCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreatePageMutation, { data, loading, error }] = useTestCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreatePageMutation,
    TestCreatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreatePageMutation,
    TestCreatePageMutationVariables
  >(TestCreatePageGql, options)
}
export type TestCreatePageMutationHookResult = ReturnType<
  typeof useTestCreatePageMutation
>
export type TestCreatePageMutationResult =
  Apollo.MutationResult<TestCreatePageMutation>
export type TestCreatePageMutationOptions = Apollo.BaseMutationOptions<
  TestCreatePageMutation,
  TestCreatePageMutationVariables
>
