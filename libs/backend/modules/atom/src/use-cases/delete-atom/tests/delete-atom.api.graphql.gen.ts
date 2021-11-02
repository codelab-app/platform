import * as Types from '@codelab/frontend/abstract/codegen'

import {
  AtomBaseFragment,
  AtomFragment,
} from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  AtomBaseFragmentDoc,
  AtomFragmentDoc,
} from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestDeleteAtomMutationVariables = Types.Exact<{
  input: Types.DeleteAtomInput
}>

export type TestDeleteAtomMutation = {
  deleteAtom?: Types.Maybe<AtomBaseFragment>
}

export const TestDeleteAtomGql = gql`
  mutation TestDeleteAtom($input: DeleteAtomInput!) {
    deleteAtom(input: $input) {
      ...AtomBase
    }
  }
  ${AtomBaseFragmentDoc}
`
export type TestDeleteAtomMutationFn = Apollo.MutationFunction<
  TestDeleteAtomMutation,
  TestDeleteAtomMutationVariables
>

/**
 * __useTestDeleteAtomMutation__
 *
 * To run a mutation, you first call `useTestDeleteAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteAtomMutation, { data, loading, error }] = useTestDeleteAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeleteAtomMutation,
    TestDeleteAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeleteAtomMutation,
    TestDeleteAtomMutationVariables
  >(TestDeleteAtomGql, options)
}
export type TestDeleteAtomMutationHookResult = ReturnType<
  typeof useTestDeleteAtomMutation
>
export type TestDeleteAtomMutationResult =
  Apollo.MutationResult<TestDeleteAtomMutation>
export type TestDeleteAtomMutationOptions = Apollo.BaseMutationOptions<
  TestDeleteAtomMutation,
  TestDeleteAtomMutationVariables
>
