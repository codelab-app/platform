import * as Types from '@codelab/frontend/abstract/codegen'

import { AtomBaseFragment } from '../../Atom.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AtomBaseFragmentDoc } from '../../Atom.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type UpdateAtomMutationVariables = Types.Exact<{
  input: Types.UpdateAtomInput
}>

export type UpdateAtomMutation = { updateAtom?: Types.Maybe<AtomBaseFragment> }

export const UpdateAtomGql = gql`
  mutation UpdateAtom($input: UpdateAtomInput!) {
    updateAtom(input: $input) {
      ...AtomBase
    }
  }
  ${AtomBaseFragmentDoc}
`
export type UpdateAtomMutationFn = Apollo.MutationFunction<
  UpdateAtomMutation,
  UpdateAtomMutationVariables
>

/**
 * __useUpdateAtomMutation__
 *
 * To run a mutation, you first call `useUpdateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAtomMutation, { data, loading, error }] = useUpdateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAtomMutation,
    UpdateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAtomMutation, UpdateAtomMutationVariables>(
    UpdateAtomGql,
    options,
  )
}
export type UpdateAtomMutationHookResult = ReturnType<
  typeof useUpdateAtomMutation
>
export type UpdateAtomMutationResult = Apollo.MutationResult<UpdateAtomMutation>
export type UpdateAtomMutationOptions = Apollo.BaseMutationOptions<
  UpdateAtomMutation,
  UpdateAtomMutationVariables
>
