import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const DeleteAppGql = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      id
      title
    }
  }
`
export type DeleteAppMutationFn = Apollo.MutationFunction<
  Types.DeleteAppMutation,
  Types.DeleteAppMutationVariables
>

/**
 * __useDeleteAppMutation__
 *
 * To run a mutation, you first call `useDeleteAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAppMutation, { data, loading, error }] = useDeleteAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteAppMutation,
    Types.DeleteAppMutationVariables
  >,
) {
  return Apollo.useMutation<
    Types.DeleteAppMutation,
    Types.DeleteAppMutationVariables
  >(DeleteAppGql, baseOptions)
}
export type DeleteAppMutationHookResult = ReturnType<
  typeof useDeleteAppMutation
>
export type DeleteAppMutationResult = Apollo.MutationResult<Types.DeleteAppMutation>
export type DeleteAppMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteAppMutation,
  Types.DeleteAppMutationVariables
>
export type DeleteAppMutationVariables = Types.Exact<{
  input: Types.DeleteAppInput
}>

export type DeleteAppMutation = { __typename?: 'Mutation' } & {
  deleteApp: { __typename?: 'App' } & Pick<Types.App, 'id' | 'title'>
}
