import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ResetDataMutationVariables = Types.Exact<{ [key: string]: never }>

export type ResetDataMutation = { resetData?: Types.Maybe<void> }

export const ResetDataGql = gql`
  mutation ResetData {
    resetData
  }
`
export type ResetDataMutationFn = Apollo.MutationFunction<
  ResetDataMutation,
  ResetDataMutationVariables
>

/**
 * __useResetDataMutation__
 *
 * To run a mutation, you first call `useResetDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetDataMutation, { data, loading, error }] = useResetDataMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetDataMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetDataMutation,
    ResetDataMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ResetDataMutation, ResetDataMutationVariables>(
    ResetDataGql,
    options,
  )
}
export type ResetDataMutationHookResult = ReturnType<
  typeof useResetDataMutation
>
export type ResetDataMutationResult = Apollo.MutationResult<ResetDataMutation>
export type ResetDataMutationOptions = Apollo.BaseMutationOptions<
  ResetDataMutation,
  ResetDataMutationVariables
>
