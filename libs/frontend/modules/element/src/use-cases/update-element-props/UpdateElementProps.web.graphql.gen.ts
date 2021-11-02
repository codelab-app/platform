import * as Types from '@codelab/frontend/abstract/codegen'

import { ElementFragment } from '../../graphql/Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { ElementFragmentDoc } from '../../graphql/Element.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type UpdateElementPropsMutationVariables = Types.Exact<{
  input: Types.UpdateElementPropsInput
}>

export type UpdateElementPropsMutation = { updateElementProps: ElementFragment }

export const UpdateElementPropsGql = gql`
  mutation UpdateElementProps($input: UpdateElementPropsInput!) {
    updateElementProps(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export type UpdateElementPropsMutationFn = Apollo.MutationFunction<
  UpdateElementPropsMutation,
  UpdateElementPropsMutationVariables
>

/**
 * __useUpdateElementPropsMutation__
 *
 * To run a mutation, you first call `useUpdateElementPropsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateElementPropsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateElementPropsMutation, { data, loading, error }] = useUpdateElementPropsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateElementPropsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateElementPropsMutation,
    UpdateElementPropsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateElementPropsMutation,
    UpdateElementPropsMutationVariables
  >(UpdateElementPropsGql, options)
}
export type UpdateElementPropsMutationHookResult = ReturnType<
  typeof useUpdateElementPropsMutation
>
export type UpdateElementPropsMutationResult =
  Apollo.MutationResult<UpdateElementPropsMutation>
export type UpdateElementPropsMutationOptions = Apollo.BaseMutationOptions<
  UpdateElementPropsMutation,
  UpdateElementPropsMutationVariables
>
