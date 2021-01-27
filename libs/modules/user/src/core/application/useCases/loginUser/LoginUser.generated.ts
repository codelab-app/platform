import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const LoginUserGql = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      email
      accessToken
    }
  }
`
export type LoginUserMutationFn = Apollo.MutationFunction<
  Types.LoginUserMutation,
  Types.LoginUserMutationVariables
>

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.LoginUserMutation,
    Types.LoginUserMutationVariables
  >,
) {
  return Apollo.useMutation<
    Types.LoginUserMutation,
    Types.LoginUserMutationVariables
  >(LoginUserGql, baseOptions)
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>
export type LoginUserMutationResult = Apollo.MutationResult<Types.LoginUserMutation>
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  Types.LoginUserMutation,
  Types.LoginUserMutationVariables
>
