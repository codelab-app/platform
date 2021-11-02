import * as Types from '@codelab/frontend/abstract/codegen'

import { PageBaseFragment } from '../../graphql/PageBase.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { PageBaseFragmentDoc } from '../../graphql/PageBase.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type DeletePageMutationVariables = Types.Exact<{
  input: Types.DeletePageInput
}>

export type DeletePageMutation = { deletePage: PageBaseFragment }

export const DeletePageGql = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export type DeletePageMutationFn = Apollo.MutationFunction<
  DeletePageMutation,
  DeletePageMutationVariables
>

/**
 * __useDeletePageMutation__
 *
 * To run a mutation, you first call `useDeletePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageMutation, { data, loading, error }] = useDeletePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePageMutation,
    DeletePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(
    DeletePageGql,
    options,
  )
}
export type DeletePageMutationHookResult = ReturnType<
  typeof useDeletePageMutation
>
export type DeletePageMutationResult = Apollo.MutationResult<DeletePageMutation>
export type DeletePageMutationOptions = Apollo.BaseMutationOptions<
  DeletePageMutation,
  DeletePageMutationVariables
>
