import * as Types from '@codelab/frontend/abstract/codegen'

import { AppBaseFragment } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AppBaseFragmentDoc } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestUpdateAppMutationVariables = Types.Exact<{
  input: Types.UpdateAppInput
}>

export type TestUpdateAppMutation = {
  updateApp?: AppBaseFragment | null | undefined
}

export const TestUpdateAppGql = gql`
  mutation TestUpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      ...AppBase
    }
  }
  ${AppBaseFragmentDoc}
`
export type TestUpdateAppMutationFn = Apollo.MutationFunction<
  TestUpdateAppMutation,
  TestUpdateAppMutationVariables
>

/**
 * __useTestUpdateAppMutation__
 *
 * To run a mutation, you first call `useTestUpdateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateAppMutation, { data, loading, error }] = useTestUpdateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateAppMutation,
    TestUpdateAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateAppMutation,
    TestUpdateAppMutationVariables
  >(TestUpdateAppGql, options)
}
export type TestUpdateAppMutationHookResult = ReturnType<
  typeof useTestUpdateAppMutation
>
export type TestUpdateAppMutationResult =
  Apollo.MutationResult<TestUpdateAppMutation>
export type TestUpdateAppMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateAppMutation,
  TestUpdateAppMutationVariables
>
