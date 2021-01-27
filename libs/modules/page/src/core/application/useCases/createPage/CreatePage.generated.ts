import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const CreatePageGql = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      id
      title
    }
  }
`
export type CreatePageMutationFn = Apollo.MutationFunction<
  Types.CreatePageMutation,
  Types.CreatePageMutationVariables
>

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreatePageMutation,
    Types.CreatePageMutationVariables
  >,
) {
  return Apollo.useMutation<
    Types.CreatePageMutation,
    Types.CreatePageMutationVariables
  >(CreatePageGql, baseOptions)
}
export type CreatePageMutationHookResult = ReturnType<
  typeof useCreatePageMutation
>
export type CreatePageMutationResult = Apollo.MutationResult<Types.CreatePageMutation>
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<
  Types.CreatePageMutation,
  Types.CreatePageMutationVariables
>
export type CreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput
}>

export type CreatePageMutation = { __typename?: 'Mutation' } & {
  createPage: { __typename?: 'Page' } & Pick<Types.Page, 'id' | 'title'>
}
