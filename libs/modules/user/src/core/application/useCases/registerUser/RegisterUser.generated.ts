import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const RegisterUserGql = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      email
      accessToken
    }
  }
`
export type RegisterUserMutationFn = Apollo.MutationFunction<
  Types.RegisterUserMutation,
  Types.RegisterUserMutationVariables
>

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RegisterUserMutation,
    Types.RegisterUserMutationVariables
  >,
) {
  return Apollo.useMutation<
    Types.RegisterUserMutation,
    Types.RegisterUserMutationVariables
  >(RegisterUserGql, baseOptions)
}
export type RegisterUserMutationHookResult = ReturnType<
  typeof useRegisterUserMutation
>
export type RegisterUserMutationResult = Apollo.MutationResult<Types.RegisterUserMutation>
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<
  Types.RegisterUserMutation,
  Types.RegisterUserMutationVariables
>
