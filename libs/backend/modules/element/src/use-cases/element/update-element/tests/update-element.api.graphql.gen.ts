import * as Types from '@codelab/frontend/abstract/codegen'

import { TestElementFragment } from '../../../../test/graphql/TestElement.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestElementFragmentDoc } from '../../../../test/graphql/TestElement.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestUpdateElementMutationVariables = Types.Exact<{
  input: Types.UpdateElementInput
}>

export type TestUpdateElementMutation = { updateElement: TestElementFragment }

export const TestUpdateElementGql = gql`
  mutation TestUpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input) {
      ...TestElement
    }
  }
  ${TestElementFragmentDoc}
`
export type TestUpdateElementMutationFn = Apollo.MutationFunction<
  TestUpdateElementMutation,
  TestUpdateElementMutationVariables
>

/**
 * __useTestUpdateElementMutation__
 *
 * To run a mutation, you first call `useTestUpdateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateElementMutation, { data, loading, error }] = useTestUpdateElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateElementMutation,
    TestUpdateElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateElementMutation,
    TestUpdateElementMutationVariables
  >(TestUpdateElementGql, options)
}
export type TestUpdateElementMutationHookResult = ReturnType<
  typeof useTestUpdateElementMutation
>
export type TestUpdateElementMutationResult =
  Apollo.MutationResult<TestUpdateElementMutation>
export type TestUpdateElementMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateElementMutation,
  TestUpdateElementMutationVariables
>
