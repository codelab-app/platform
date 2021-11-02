import * as Types from '@codelab/frontend/abstract/codegen'

import { PageBaseFragment } from '../../../../../../../frontend/modules/page/src/graphql/PageBase.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { PageBaseFragmentDoc } from '../../../../../../../frontend/modules/page/src/graphql/PageBase.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestDeletePageMutationVariables = Types.Exact<{
  input: Types.DeletePageInput
}>

export type TestDeletePageMutation = { deletePage: PageBaseFragment }

export const TestDeletePageGql = gql`
  mutation TestDeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export type TestDeletePageMutationFn = Apollo.MutationFunction<
  TestDeletePageMutation,
  TestDeletePageMutationVariables
>

/**
 * __useTestDeletePageMutation__
 *
 * To run a mutation, you first call `useTestDeletePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeletePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeletePageMutation, { data, loading, error }] = useTestDeletePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeletePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeletePageMutation,
    TestDeletePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeletePageMutation,
    TestDeletePageMutationVariables
  >(TestDeletePageGql, options)
}
export type TestDeletePageMutationHookResult = ReturnType<
  typeof useTestDeletePageMutation
>
export type TestDeletePageMutationResult =
  Apollo.MutationResult<TestDeletePageMutation>
export type TestDeletePageMutationOptions = Apollo.BaseMutationOptions<
  TestDeletePageMutation,
  TestDeletePageMutationVariables
>
