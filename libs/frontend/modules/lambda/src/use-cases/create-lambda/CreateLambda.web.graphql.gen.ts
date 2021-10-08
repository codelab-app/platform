import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type CreateLambdaMutationVariables = Types.Exact<{
  input: Types.CreateLambdaInput
}>

export type CreateLambdaMutation = { createLambda: { id: string } }

export const CreateLambdaGql = gql`
  mutation CreateLambda($input: CreateLambdaInput!) {
    createLambda(input: $input) {
      id
    }
  }
`
export type CreateLambdaMutationFn = Apollo.MutationFunction<
  CreateLambdaMutation,
  CreateLambdaMutationVariables
>

/**
 * __useCreateLambdaMutation__
 *
 * To run a mutation, you first call `useCreateLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLambdaMutation, { data, loading, error }] = useCreateLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLambdaMutation,
    CreateLambdaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateLambdaMutation,
    CreateLambdaMutationVariables
  >(CreateLambdaGql, options)
}
export type CreateLambdaMutationHookResult = ReturnType<
  typeof useCreateLambdaMutation
>
export type CreateLambdaMutationResult =
  Apollo.MutationResult<CreateLambdaMutation>
export type CreateLambdaMutationOptions = Apollo.BaseMutationOptions<
  CreateLambdaMutation,
  CreateLambdaMutationVariables
>
