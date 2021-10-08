import * as Types from '@codelab/frontend/abstract/codegen'

import { AppBaseFragment } from '../../App.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AppBaseFragmentDoc } from '../../App.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type UpdateAppMutationVariables = Types.Exact<{
  input: Types.UpdateAppInput
}>

export type UpdateAppMutation = {
  updateApp?: AppBaseFragment | null | undefined
}

export const UpdateAppGql = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      ...AppBase
    }
  }
  ${AppBaseFragmentDoc}
`
export type UpdateAppMutationFn = Apollo.MutationFunction<
  UpdateAppMutation,
  UpdateAppMutationVariables
>

/**
 * __useUpdateAppMutation__
 *
 * To run a mutation, you first call `useUpdateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppMutation, { data, loading, error }] = useUpdateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAppMutation,
    UpdateAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAppMutation, UpdateAppMutationVariables>(
    UpdateAppGql,
    options,
  )
}
export type UpdateAppMutationHookResult = ReturnType<
  typeof useUpdateAppMutation
>
export type UpdateAppMutationResult = Apollo.MutationResult<UpdateAppMutation>
export type UpdateAppMutationOptions = Apollo.BaseMutationOptions<
  UpdateAppMutation,
  UpdateAppMutationVariables
>
