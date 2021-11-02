import * as Types from '@codelab/frontend/abstract/codegen'

import { TestElementFragment } from '../../../../libs/backend/modules/element/src/test/graphql/TestElement.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestElementFragmentDoc } from '../../../../libs/backend/modules/element/src/test/graphql/TestElement.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type E2eCreateComponentMutationVariables = Types.Exact<{
  input: Types.CreateComponentInput
}>

export type E2eCreateComponentMutation = {
  createComponent: TestElementFragment
}

export const E2eCreateComponentGql = gql`
  mutation E2eCreateComponent($input: CreateComponentInput!) {
    createComponent(input: $input) {
      ...TestElement
    }
  }
  ${TestElementFragmentDoc}
`
export type E2eCreateComponentMutationFn = Apollo.MutationFunction<
  E2eCreateComponentMutation,
  E2eCreateComponentMutationVariables
>

/**
 * __useE2eCreateComponentMutation__
 *
 * To run a mutation, you first call `useE2eCreateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eCreateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eCreateComponentMutation, { data, loading, error }] = useE2eCreateComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eCreateComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eCreateComponentMutation,
    E2eCreateComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eCreateComponentMutation,
    E2eCreateComponentMutationVariables
  >(E2eCreateComponentGql, options)
}
export type E2eCreateComponentMutationHookResult = ReturnType<
  typeof useE2eCreateComponentMutation
>
export type E2eCreateComponentMutationResult =
  Apollo.MutationResult<E2eCreateComponentMutation>
export type E2eCreateComponentMutationOptions = Apollo.BaseMutationOptions<
  E2eCreateComponentMutation,
  E2eCreateComponentMutationVariables
>
