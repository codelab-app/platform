import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const DeleteUserGql = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      email
    }
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  Types.DeleteUserMutation,
  Types.DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteUserMutation,
    Types.DeleteUserMutationVariables
  >,
) {
  return Apollo.useMutation<
    Types.DeleteUserMutation,
    Types.DeleteUserMutationVariables
  >(DeleteUserGql, baseOptions)
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<Types.DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteUserMutation,
  Types.DeleteUserMutationVariables
>
