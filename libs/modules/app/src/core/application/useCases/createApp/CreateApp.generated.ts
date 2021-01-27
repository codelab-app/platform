import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const CreateAppGql = gql`
  mutation CreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      id
      title
    }
  }
`
export type CreateAppMutationFn = Apollo.MutationFunction<
  Types.CreateAppMutation,
  Types.CreateAppMutationVariables
>

/**
 * __useCreateAppMutation__
 *
 * To run a mutation, you first call `useCreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppMutation, { data, loading, error }] = useCreateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateAppMutation,
    Types.CreateAppMutationVariables
  >,
) {
  return Apollo.useMutation<
    Types.CreateAppMutation,
    Types.CreateAppMutationVariables
  >(CreateAppGql, baseOptions)
}
export type CreateAppMutationHookResult = ReturnType<
  typeof useCreateAppMutation
>
export type CreateAppMutationResult = Apollo.MutationResult<Types.CreateAppMutation>
export type CreateAppMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateAppMutation,
  Types.CreateAppMutationVariables
>
