import * as Types from '@codelab/frontend/abstract/codegen'

import { TagFragment } from '../../../../../../../frontend/modules/tag/src/use-cases/Tag.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TagFragmentDoc } from '../../../../../../../frontend/modules/tag/src/use-cases/Tag.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestUpdateTagMutationVariables = Types.Exact<{
  input: Types.UpdateTagInput
}>

export type TestUpdateTagMutation = {
  updateTag?: TagFragment | null | undefined
}

export const TestUpdateTagGql = gql`
  mutation TestUpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input) {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`
export type TestUpdateTagMutationFn = Apollo.MutationFunction<
  TestUpdateTagMutation,
  TestUpdateTagMutationVariables
>

/**
 * __useTestUpdateTagMutation__
 *
 * To run a mutation, you first call `useTestUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateTagMutation, { data, loading, error }] = useTestUpdateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateTagMutation,
    TestUpdateTagMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateTagMutation,
    TestUpdateTagMutationVariables
  >(TestUpdateTagGql, options)
}
export type TestUpdateTagMutationHookResult = ReturnType<
  typeof useTestUpdateTagMutation
>
export type TestUpdateTagMutationResult =
  Apollo.MutationResult<TestUpdateTagMutation>
export type TestUpdateTagMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateTagMutation,
  TestUpdateTagMutationVariables
>
