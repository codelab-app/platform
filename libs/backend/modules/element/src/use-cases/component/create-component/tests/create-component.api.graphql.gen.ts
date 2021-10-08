import * as Types from '@codelab/frontend/abstract/codegen'

import { ElementFragment } from '../../../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { ElementFragmentDoc } from '../../../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestCreateComponentMutationVariables = Types.Exact<{
  input: Types.CreateComponentInput
}>

export type TestCreateComponentMutation = { createComponent: ElementFragment }

export const TestCreateComponentGql = gql`
  mutation TestCreateComponent($input: CreateComponentInput!) {
    createComponent(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export type TestCreateComponentMutationFn = Apollo.MutationFunction<
  TestCreateComponentMutation,
  TestCreateComponentMutationVariables
>

/**
 * __useTestCreateComponentMutation__
 *
 * To run a mutation, you first call `useTestCreateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateComponentMutation, { data, loading, error }] = useTestCreateComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreateComponentMutation,
    TestCreateComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreateComponentMutation,
    TestCreateComponentMutationVariables
  >(TestCreateComponentGql, options)
}
export type TestCreateComponentMutationHookResult = ReturnType<
  typeof useTestCreateComponentMutation
>
export type TestCreateComponentMutationResult =
  Apollo.MutationResult<TestCreateComponentMutation>
export type TestCreateComponentMutationOptions = Apollo.BaseMutationOptions<
  TestCreateComponentMutation,
  TestCreateComponentMutationVariables
>
