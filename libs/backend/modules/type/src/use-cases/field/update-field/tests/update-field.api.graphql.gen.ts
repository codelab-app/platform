import * as Types from '@codelab/frontend/abstract/codegen'

import { TestFieldFragment } from '../../../../tests/graphql/TestField.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestFieldFragmentDoc } from '../../../../tests/graphql/TestField.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestUpdateFieldMutationVariables = Types.Exact<{
  input: Types.UpdateFieldInput
}>

export type TestUpdateFieldMutation = {
  updateField?: TestFieldFragment | null | undefined
}

export const TestUpdateFieldGql = gql`
  mutation TestUpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      ...TestField
    }
  }
  ${TestFieldFragmentDoc}
`
export type TestUpdateFieldMutationFn = Apollo.MutationFunction<
  TestUpdateFieldMutation,
  TestUpdateFieldMutationVariables
>

/**
 * __useTestUpdateFieldMutation__
 *
 * To run a mutation, you first call `useTestUpdateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateFieldMutation, { data, loading, error }] = useTestUpdateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateFieldMutation,
    TestUpdateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateFieldMutation,
    TestUpdateFieldMutationVariables
  >(TestUpdateFieldGql, options)
}
export type TestUpdateFieldMutationHookResult = ReturnType<
  typeof useTestUpdateFieldMutation
>
export type TestUpdateFieldMutationResult =
  Apollo.MutationResult<TestUpdateFieldMutation>
export type TestUpdateFieldMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateFieldMutation,
  TestUpdateFieldMutationVariables
>
