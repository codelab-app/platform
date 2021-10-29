import * as Types from '@codelab/frontend/abstract/codegen'

import { AtomBaseFragment } from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AtomBaseFragmentDoc } from '../../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestUpdateAtomMutationVariables = Types.Exact<{
  input: Types.UpdateAtomInput
}>

export type TestUpdateAtomMutation = {
  updateAtom?: Types.Maybe<AtomBaseFragment>
}

export const TestUpdateAtomGql = gql`
  mutation TestUpdateAtom($input: UpdateAtomInput!) {
    updateAtom(input: $input) {
      ...AtomBase
    }
  }
  ${AtomBaseFragmentDoc}
`
export type TestUpdateAtomMutationFn = Apollo.MutationFunction<
  TestUpdateAtomMutation,
  TestUpdateAtomMutationVariables
>

/**
 * __useTestUpdateAtomMutation__
 *
 * To run a mutation, you first call `useTestUpdateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateAtomMutation, { data, loading, error }] = useTestUpdateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateAtomMutation,
    TestUpdateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateAtomMutation,
    TestUpdateAtomMutationVariables
  >(TestUpdateAtomGql, options)
}
export type TestUpdateAtomMutationHookResult = ReturnType<
  typeof useTestUpdateAtomMutation
>
export type TestUpdateAtomMutationResult =
  Apollo.MutationResult<TestUpdateAtomMutation>
export type TestUpdateAtomMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateAtomMutation,
  TestUpdateAtomMutationVariables
>
