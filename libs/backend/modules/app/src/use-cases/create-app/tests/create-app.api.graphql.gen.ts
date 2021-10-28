import * as Types from '@codelab/shared/codegen/graphql';

import { AppBaseFragment } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen';
import { AppBaseFragmentDoc } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestCreateAppMutationVariables = Types.Exact<{
  input: Types.CreateAppInput;
}>;


export type TestCreateAppMutation = { createApp: AppBaseFragment };


export const TestCreateAppGql = `
    mutation TestCreateApp($input: CreateAppInput!) {
  createApp(input: $input) {
    ...AppBase
  }
}
    ${AppBaseFragmentDoc}`;
export type TestCreateAppMutationFn = Apollo.MutationFunction<TestCreateAppMutation, TestCreateAppMutationVariables>;

/**
 * __useTestCreateAppMutation__
 *
 * To run a mutation, you first call `useTestCreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateAppMutation, { data, loading, error }] = useTestCreateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateAppMutation(baseOptions?: Apollo.MutationHookOptions<TestCreateAppMutation, TestCreateAppMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestCreateAppMutation, TestCreateAppMutationVariables>(TestCreateAppGql, options);
      }
export type TestCreateAppMutationHookResult = ReturnType<typeof useTestCreateAppMutation>;
export type TestCreateAppMutationResult = Apollo.MutationResult<TestCreateAppMutation>;
export type TestCreateAppMutationOptions = Apollo.BaseMutationOptions<TestCreateAppMutation, TestCreateAppMutationVariables>;