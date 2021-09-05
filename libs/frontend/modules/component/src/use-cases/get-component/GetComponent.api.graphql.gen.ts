import * as Types from '@codelab/shared/codegen/graphql';

import { ComponentFragment } from '../../Component.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { ComponentFragmentDoc } from '../../Component.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetComponentQueryVariables = Types.Exact<{
  input: Types.GetComponentInput;
}>;


export type GetComponentQuery = { getComponent?: Types.Maybe<ComponentFragment> };


export const GetComponentGql = gql`
    query GetComponent($input: GetComponentInput!) {
  getComponent(input: $input) {
    ...Component
  }
}
    ${ComponentFragmentDoc}`;

/**
 * __useGetComponentQuery__
 *
 * To run a query within a React component, call `useGetComponentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetComponentQuery(baseOptions: Apollo.QueryHookOptions<GetComponentQuery, GetComponentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComponentQuery, GetComponentQueryVariables>(GetComponentGql, options);
      }
export function useGetComponentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComponentQuery, GetComponentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComponentQuery, GetComponentQueryVariables>(GetComponentGql, options);
        }
export type GetComponentQueryHookResult = ReturnType<typeof useGetComponentQuery>;
export type GetComponentLazyQueryHookResult = ReturnType<typeof useGetComponentLazyQuery>;
export type GetComponentQueryResult = Apollo.QueryResult<GetComponentQuery, GetComponentQueryVariables>;
export function refetchGetComponentQuery(variables?: GetComponentQueryVariables) {
      return { query: GetComponentGql, variables: variables }
    }