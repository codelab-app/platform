import * as Types from '@codelab/frontend/abstract/codegen'

import { TestLambdaPayloadFragment } from '../../../domain/lambda-payload.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestLambdaPayloadFragmentDoc } from '../../../domain/lambda-payload.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestExecuteLambdaMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput
}>

export type TestExecuteLambdaMutation = {
  executeLambda?: TestLambdaPayloadFragment | null | undefined
}

export const TestExecuteLambdaGql = gql`
  mutation TestExecuteLambda($input: ExecuteLambdaInput!) {
    executeLambda(input: $input) {
      ...TestLambdaPayload
    }
  }
  ${TestLambdaPayloadFragmentDoc}
`
export type TestExecuteLambdaMutationFn = Apollo.MutationFunction<
  TestExecuteLambdaMutation,
  TestExecuteLambdaMutationVariables
>

/**
 * __useTestExecuteLambdaMutation__
 *
 * To run a mutation, you first call `useTestExecuteLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestExecuteLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testExecuteLambdaMutation, { data, loading, error }] = useTestExecuteLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestExecuteLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestExecuteLambdaMutation,
    TestExecuteLambdaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestExecuteLambdaMutation,
    TestExecuteLambdaMutationVariables
  >(TestExecuteLambdaGql, options)
}
export type TestExecuteLambdaMutationHookResult = ReturnType<
  typeof useTestExecuteLambdaMutation
>
export type TestExecuteLambdaMutationResult =
  Apollo.MutationResult<TestExecuteLambdaMutation>
export type TestExecuteLambdaMutationOptions = Apollo.BaseMutationOptions<
  TestExecuteLambdaMutation,
  TestExecuteLambdaMutationVariables
>
