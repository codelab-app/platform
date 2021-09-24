import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagGraphFragment } from '../../../domain/tag-graph.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TestTagGraphFragmentDoc } from '../../../domain/tag-graph.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetTagGraphsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetTagGraphsQuery = { getTagGraphs: Array<TestTagGraphFragment> };


export const TestGetTagGraphsGql = gql`
    query TestGetTagGraphs {
  getTagGraphs {
    ...TestTagGraph
  }
}
    ${TestTagGraphFragmentDoc}`;

/**
 * __useTestGetTagGraphsQuery__
 *
 * To run a query within a React component, call `useTestGetTagGraphsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTagGraphsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTagGraphsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestGetTagGraphsQuery(baseOptions?: Apollo.QueryHookOptions<TestGetTagGraphsQuery, TestGetTagGraphsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetTagGraphsQuery, TestGetTagGraphsQueryVariables>(TestGetTagGraphsGql, options);
      }
export function useTestGetTagGraphsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetTagGraphsQuery, TestGetTagGraphsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetTagGraphsQuery, TestGetTagGraphsQueryVariables>(TestGetTagGraphsGql, options);
        }
export type TestGetTagGraphsQueryHookResult = ReturnType<typeof useTestGetTagGraphsQuery>;
export type TestGetTagGraphsLazyQueryHookResult = ReturnType<typeof useTestGetTagGraphsLazyQuery>;
export type TestGetTagGraphsQueryResult = Apollo.QueryResult<TestGetTagGraphsQuery, TestGetTagGraphsQueryVariables>;
export function refetchTestGetTagGraphsQuery(variables?: TestGetTagGraphsQueryVariables) {
      return { query: TestGetTagGraphsGql, variables: variables }
    }