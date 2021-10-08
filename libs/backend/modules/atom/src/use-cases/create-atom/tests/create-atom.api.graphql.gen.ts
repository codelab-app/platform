import * as Types from '@codelab/frontend/abstract/codegen'

import { TestAtomBaseFragment } from '../../../test/graphql/TestAtom.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestAtomBaseFragmentDoc } from '../../../test/graphql/TestAtom.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestCreateAtomMutationVariables = Types.Exact<{
  input: Types.CreateAtomInput
}>

export type TestCreateAtomMutation = { createAtom: TestAtomBaseFragment }

export const TestCreateAtomGql = gql`
  mutation TestCreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      ...TestAtomBase
    }
  }
  ${TestAtomBaseFragmentDoc}
`
export type TestCreateAtomMutationFn = Apollo.MutationFunction<
  TestCreateAtomMutation,
  TestCreateAtomMutationVariables
>

/**
 * __useTestCreateAtomMutation__
 *
 * To run a mutation, you first call `useTestCreateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateAtomMutation, { data, loading, error }] = useTestCreateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreateAtomMutation,
    TestCreateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreateAtomMutation,
    TestCreateAtomMutationVariables
  >(TestCreateAtomGql, options)
}
export type TestCreateAtomMutationHookResult = ReturnType<
  typeof useTestCreateAtomMutation
>
export type TestCreateAtomMutationResult =
  Apollo.MutationResult<TestCreateAtomMutation>
export type TestCreateAtomMutationOptions = Apollo.BaseMutationOptions<
  TestCreateAtomMutation,
  TestCreateAtomMutationVariables
>
