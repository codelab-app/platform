import * as Types from '@codelab/shared/codegen/graphql';

import { ComponentFragment } from '../../Component.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { ComponentFragmentDoc } from '../../Component.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetComponentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetComponentsQuery = { getComponents: Array<ComponentFragment> };


export const GetComponentsGql = gql`
    query GetComponents {
  getComponents {
    ...Component
  }
}
    ${ComponentFragmentDoc}`;

/**
 * __useGetComponentsQuery__
 *
 * To run a query within a React component, call `useGetComponentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetComponentsQuery(baseOptions?: Apollo.QueryHookOptions<GetComponentsQuery, GetComponentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComponentsQuery, GetComponentsQueryVariables>(GetComponentsGql, options);
      }
export function useGetComponentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComponentsQuery, GetComponentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComponentsQuery, GetComponentsQueryVariables>(GetComponentsGql, options);
        }
export type GetComponentsQueryHookResult = ReturnType<typeof useGetComponentsQuery>;
export type GetComponentsLazyQueryHookResult = ReturnType<typeof useGetComponentsLazyQuery>;
export type GetComponentsQueryResult = Apollo.QueryResult<GetComponentsQuery, GetComponentsQueryVariables>;
export function refetchGetComponentsQuery(variables?: GetComponentsQueryVariables) {
      return { query: GetComponentsGql, variables: variables }
    }