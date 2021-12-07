import * as Types from '@codelab/frontend/abstract/codegen'

import { TagFragment } from '../../../../../../../frontend/modules/tag/src/graphql/Tag.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TagFragmentDoc } from '../../../../../../../frontend/modules/tag/src/graphql/Tag.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestDeleteTagsMutationVariables = Types.Exact<{
  input: Types.DeleteTagsInput
}>

export type TestDeleteTagsMutation = {
  deleteTags?: Array<TagFragment> | null | undefined
}

export const TestDeleteTagsGql = gql`
  mutation TestDeleteTags($input: DeleteTagsInput!) {
    deleteTags(input: $input) {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`
export type TestDeleteTagsMutationFn = Apollo.MutationFunction<
  TestDeleteTagsMutation,
  TestDeleteTagsMutationVariables
>

/**
 * __useTestDeleteTagsMutation__
 *
 * To run a mutation, you first call `useTestDeleteTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteTagsMutation, { data, loading, error }] = useTestDeleteTagsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteTagsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeleteTagsMutation,
    TestDeleteTagsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeleteTagsMutation,
    TestDeleteTagsMutationVariables
  >(TestDeleteTagsGql, options)
}
export type TestDeleteTagsMutationHookResult = ReturnType<
  typeof useTestDeleteTagsMutation
>
export type TestDeleteTagsMutationResult =
  Apollo.MutationResult<TestDeleteTagsMutation>
export type TestDeleteTagsMutationOptions = Apollo.BaseMutationOptions<
  TestDeleteTagsMutation,
  TestDeleteTagsMutationVariables
>
