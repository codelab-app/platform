import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../types/types.generated'

export const UpdateAppGql = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      id
      title
    }
  }
`
export type UpdateAppMutationFn = Apollo.MutationFunction<
  Types.UpdateAppMutation,
  Types.UpdateAppMutationVariables
>

/**
 * __useUpdateAppMutation__
 *
 * To run a mutation, you first call `useUpdateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppMutation, { data, loading, error }] = useUpdateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateAppMutation,
    Types.UpdateAppMutationVariables
  >,
) {
  return Apollo.useMutation<
    Types.UpdateAppMutation,
    Types.UpdateAppMutationVariables
  >(UpdateAppGql, baseOptions)
}
export type UpdateAppMutationHookResult = ReturnType<
  typeof useUpdateAppMutation
>
export type UpdateAppMutationResult = Apollo.MutationResult<Types.UpdateAppMutation>
export type UpdateAppMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateAppMutation,
  Types.UpdateAppMutationVariables
>
export type UpdateAppMutationVariables = Types.Exact<{
  input: Types.UpdateAppInput
}>

export type UpdateAppMutation = { __typename?: 'Mutation' } & {
  updateApp: { __typename?: 'App' } & Pick<Types.App, 'id' | 'title'>
}
