import * as Types from '@codelab/frontend/abstract/codegen'

import { TestFieldFragment } from '../../../../libs/backend/modules/type/src/tests/graphql/TestField.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestFieldFragmentDoc } from '../../../../libs/backend/modules/type/src/tests/graphql/TestField.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type E2eCreateFieldMutationVariables = Types.Exact<{
  input: Types.CreateFieldInput
}>

export type E2eCreateFieldMutation = { createField: TestFieldFragment }

export const E2eCreateFieldGql = gql`
  mutation E2eCreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      ...TestField
    }
  }
  ${TestFieldFragmentDoc}
`
export type E2eCreateFieldMutationFn = Apollo.MutationFunction<
  E2eCreateFieldMutation,
  E2eCreateFieldMutationVariables
>

/**
 * __useE2eCreateFieldMutation__
 *
 * To run a mutation, you first call `useE2eCreateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eCreateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eCreateFieldMutation, { data, loading, error }] = useE2eCreateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eCreateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eCreateFieldMutation,
    E2eCreateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eCreateFieldMutation,
    E2eCreateFieldMutationVariables
  >(E2eCreateFieldGql, options)
}
export type E2eCreateFieldMutationHookResult = ReturnType<
  typeof useE2eCreateFieldMutation
>
export type E2eCreateFieldMutationResult =
  Apollo.MutationResult<E2eCreateFieldMutation>
export type E2eCreateFieldMutationOptions = Apollo.BaseMutationOptions<
  E2eCreateFieldMutation,
  E2eCreateFieldMutationVariables
>
