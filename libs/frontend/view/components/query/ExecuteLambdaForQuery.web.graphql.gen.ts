import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ExecuteLambdaForQueryMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput
}>

export type ExecuteLambdaForQueryMutation = {
  executeLambda?: { payload: string } | null | undefined
}

export const ExecuteLambdaForQueryGql = gql`
  mutation ExecuteLambdaForQuery($input: ExecuteLambdaInput!) {
    executeLambda(input: $input) {
      payload
    }
  }
`
export type ExecuteLambdaForQueryMutationFn = Apollo.MutationFunction<
  ExecuteLambdaForQueryMutation,
  ExecuteLambdaForQueryMutationVariables
>

/**
 * __useExecuteLambdaForQueryMutation__
 *
 * To run a mutation, you first call `useExecuteLambdaForQueryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteLambdaForQueryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeLambdaForQueryMutation, { data, loading, error }] = useExecuteLambdaForQueryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExecuteLambdaForQueryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ExecuteLambdaForQueryMutation,
    ExecuteLambdaForQueryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ExecuteLambdaForQueryMutation,
    ExecuteLambdaForQueryMutationVariables
  >(ExecuteLambdaForQueryGql, options)
}
export type ExecuteLambdaForQueryMutationHookResult = ReturnType<
  typeof useExecuteLambdaForQueryMutation
>
export type ExecuteLambdaForQueryMutationResult =
  Apollo.MutationResult<ExecuteLambdaForQueryMutation>
export type ExecuteLambdaForQueryMutationOptions = Apollo.BaseMutationOptions<
  ExecuteLambdaForQueryMutation,
  ExecuteLambdaForQueryMutationVariables
>
