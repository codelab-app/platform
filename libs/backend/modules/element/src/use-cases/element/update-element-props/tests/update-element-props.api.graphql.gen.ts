import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestUpdateElementPropsMutationVariables = Types.Exact<{
  input: Types.UpdateElementPropsInput;
}>;


export type TestUpdateElementPropsMutation = { updateElementProps?: void | null | undefined };


export const TestUpdateElementPropsGql = gql`
    mutation TestUpdateElementProps($input: UpdateElementPropsInput!) {
  updateElementProps(input: $input)
}
    `;
export type TestUpdateElementPropsMutationFn = Apollo.MutationFunction<TestUpdateElementPropsMutation, TestUpdateElementPropsMutationVariables>;

/**
 * __useTestUpdateElementPropsMutation__
 *
 * To run a mutation, you first call `useTestUpdateElementPropsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateElementPropsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateElementPropsMutation, { data, loading, error }] = useTestUpdateElementPropsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateElementPropsMutation(baseOptions?: Apollo.MutationHookOptions<TestUpdateElementPropsMutation, TestUpdateElementPropsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestUpdateElementPropsMutation, TestUpdateElementPropsMutationVariables>(TestUpdateElementPropsGql, options);
      }
export type TestUpdateElementPropsMutationHookResult = ReturnType<typeof useTestUpdateElementPropsMutation>;
export type TestUpdateElementPropsMutationResult = Apollo.MutationResult<TestUpdateElementPropsMutation>;
export type TestUpdateElementPropsMutationOptions = Apollo.BaseMutationOptions<TestUpdateElementPropsMutation, TestUpdateElementPropsMutationVariables>;