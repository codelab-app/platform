import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const UpdateUserGql = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      email
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >,
) {
  return Apollo.useMutation<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >(UpdateUserGql, baseOptions)
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<Types.UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>
export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput
}>

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & Pick<Types.User, 'email'>
}
