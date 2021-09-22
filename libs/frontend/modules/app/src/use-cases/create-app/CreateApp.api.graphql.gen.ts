import * as Types from '@codelab/shared/codegen/graphql';

import { AppBaseFragment } from '../../graphql/AppBase.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { AppBaseFragmentDoc } from '../../graphql/AppBase.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateAppMutationVariables = Types.Exact<{
  input: Types.CreateAppInput;
}>;


export type CreateAppMutation = { createApp: AppBaseFragment };


export const CreateAppGql = gql`
    mutation CreateApp($input: CreateAppInput!) {
  createApp(input: $input) {
    ...AppBase
  }
}
    ${AppBaseFragmentDoc}`;
export type CreateAppMutationFn = Apollo.MutationFunction<CreateAppMutation, CreateAppMutationVariables>;

/**
 * __useCreateAppMutation__
 *
 * To run a mutation, you first call `useCreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppMutation, { data, loading, error }] = useCreateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppMutation(baseOptions?: Apollo.MutationHookOptions<CreateAppMutation, CreateAppMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAppMutation, CreateAppMutationVariables>(CreateAppGql, options);
      }
export type CreateAppMutationHookResult = ReturnType<typeof useCreateAppMutation>;
export type CreateAppMutationResult = Apollo.MutationResult<CreateAppMutation>;
export type CreateAppMutationOptions = Apollo.BaseMutationOptions<CreateAppMutation, CreateAppMutationVariables>;