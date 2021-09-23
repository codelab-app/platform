import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from '../../../graphql/PageBase.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { PageBaseFragmentDoc } from '../../../graphql/PageBase.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput;
}>;


export type CreatePageMutation = { createPage: PageBaseFragment };


export const CreatePageGql = gql`
    mutation CreatePage($input: CreatePageInput!) {
  createPage(input: $input) {
    ...PageBase
  }
}
    ${PageBaseFragmentDoc}`;
export type CreatePageMutationFn = Apollo.MutationFunction<CreatePageMutation, CreatePageMutationVariables>;

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
export function useCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<CreatePageMutation, CreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(CreatePageGql, options);
      }
export type CreatePageMutationHookResult = ReturnType<typeof useCreatePageMutation>;
export type CreatePageMutationResult = Apollo.MutationResult<CreatePageMutation>;
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<CreatePageMutation, CreatePageMutationVariables>;