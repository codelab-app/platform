import * as Types from '@codelab/shared/codegen/graphql';

import { TagGraphFragment } from '../Tag.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TagGraphFragmentDoc } from '../Tag.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTagGraphsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTagGraphsQuery = { getTagGraphs: Array<TagGraphFragment> };


export const GetTagGraphsGql = gql`
    query GetTagGraphs {
  getTagGraphs {
    ...TagGraph
  }
}
    ${TagGraphFragmentDoc}`;

/**
 * __useGetTagGraphsQuery__
 *
 * To run a query within a React component, call `useGetTagGraphsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagGraphsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagGraphsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagGraphsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagGraphsQuery, GetTagGraphsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagGraphsQuery, GetTagGraphsQueryVariables>(GetTagGraphsGql, options);
      }
export function useGetTagGraphsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagGraphsQuery, GetTagGraphsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagGraphsQuery, GetTagGraphsQueryVariables>(GetTagGraphsGql, options);
        }
export type GetTagGraphsQueryHookResult = ReturnType<typeof useGetTagGraphsQuery>;
export type GetTagGraphsLazyQueryHookResult = ReturnType<typeof useGetTagGraphsLazyQuery>;
export type GetTagGraphsQueryResult = Apollo.QueryResult<GetTagGraphsQuery, GetTagGraphsQueryVariables>;
export function refetchGetTagGraphsQuery(variables?: GetTagGraphsQueryVariables) {
      return { query: GetTagGraphsGql, variables: variables }
    }