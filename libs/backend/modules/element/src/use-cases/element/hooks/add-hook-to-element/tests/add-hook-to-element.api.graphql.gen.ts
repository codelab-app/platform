import * as Types from '@codelab/frontend/abstract/codegen'

import {
  HookFragment,
  PropMapBindingFragment,
} from '../../../../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  HookFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../../../../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestAddHookToElementMutationVariables = Types.Exact<{
  input: Types.AddHookToElementInput
}>

export type TestAddHookToElementMutation = { addHookToElement: HookFragment }

export const TestAddHookToElementGql = gql`
  mutation TestAddHookToElement($input: AddHookToElementInput!) {
    addHookToElement(input: $input) {
      ...Hook
    }
  }
  ${HookFragmentDoc}
`
export type TestAddHookToElementMutationFn = Apollo.MutationFunction<
  TestAddHookToElementMutation,
  TestAddHookToElementMutationVariables
>

/**
 * __useTestAddHookToElementMutation__
 *
 * To run a mutation, you first call `useTestAddHookToElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestAddHookToElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testAddHookToElementMutation, { data, loading, error }] = useTestAddHookToElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestAddHookToElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestAddHookToElementMutation,
    TestAddHookToElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestAddHookToElementMutation,
    TestAddHookToElementMutationVariables
  >(TestAddHookToElementGql, options)
}
export type TestAddHookToElementMutationHookResult = ReturnType<
  typeof useTestAddHookToElementMutation
>
export type TestAddHookToElementMutationResult =
  Apollo.MutationResult<TestAddHookToElementMutation>
export type TestAddHookToElementMutationOptions = Apollo.BaseMutationOptions<
  TestAddHookToElementMutation,
  TestAddHookToElementMutationVariables
>
