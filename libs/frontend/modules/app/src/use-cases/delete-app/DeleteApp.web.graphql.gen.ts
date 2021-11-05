import * as Types from '@codelab/frontend/abstract/codegen'

import { AppBaseFragment } from '../../App.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AppBaseFragmentDoc } from '../../App.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type DeleteAppMutationVariables = Types.Exact<{
  input: Types.DeleteAppInput
}>

export type DeleteAppMutation = {
  deleteApp?: AppBaseFragment | null | undefined
}

export const DeleteAppGql = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      ...AppBase
    }
  }
  ${AppBaseFragmentDoc}
`
export type DeleteAppMutationFn = Apollo.MutationFunction<
  DeleteAppMutation,
  DeleteAppMutationVariables
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
    DeleteAppMutation,
    DeleteAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAppMutation, DeleteAppMutationVariables>(
    DeleteAppGql,
    options,
  )
}
export type DeleteAppMutationHookResult = ReturnType<
  typeof useDeleteAppMutation
>
export type DeleteAppMutationResult = Apollo.MutationResult<DeleteAppMutation>
export type DeleteAppMutationOptions = Apollo.BaseMutationOptions<
  DeleteAppMutation,
  DeleteAppMutationVariables
>
