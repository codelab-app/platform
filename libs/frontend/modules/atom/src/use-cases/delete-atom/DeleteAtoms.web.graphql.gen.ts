import * as Types from '@codelab/frontend/abstract/codegen'

import { AtomBaseFragment } from '../../Atom.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AtomBaseFragmentDoc } from '../../Atom.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type DeleteAtomMutationVariables = Types.Exact<{
  input: Types.DeleteAtomInput
}>

export type DeleteAtomMutation = { deleteAtom?: Types.Maybe<AtomBaseFragment> }

export const DeleteAtomGql = gql`
  mutation DeleteAtom($input: DeleteAtomInput!) {
    deleteAtom(input: $input) {
      ...AtomBase
    }
  }
  ${AtomBaseFragmentDoc}
`
export type DeleteAtomMutationFn = Apollo.MutationFunction<
  DeleteAtomMutation,
  DeleteAtomMutationVariables
>

/**
 * __useDeleteAtomMutation__
 *
 * To run a mutation, you first call `useDeleteAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAtomMutation, { data, loading, error }] = useDeleteAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAtomMutation,
    DeleteAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAtomMutation, DeleteAtomMutationVariables>(
    DeleteAtomGql,
    options,
  )
}
export type DeleteAtomMutationHookResult = ReturnType<
  typeof useDeleteAtomMutation
>
export type DeleteAtomMutationResult = Apollo.MutationResult<DeleteAtomMutation>
export type DeleteAtomMutationOptions = Apollo.BaseMutationOptions<
  DeleteAtomMutation,
  DeleteAtomMutationVariables
>
