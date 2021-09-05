import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagGraphFragment } from '../../../domain/tag-graph.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { TestTagGraphFragmentDoc } from '../../../domain/tag-graph.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetTagGraphQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetTagGraphQuery = { getTagGraph?: Types.Maybe<TestTagGraphFragment> };


export const TestGetTagGraphGql = gql`
    query TestGetTagGraph {
  getTagGraph {
    ...TestTagGraph
  }
}
    ${TestTagGraphFragmentDoc}`;

/**
 * __useTestGetTagGraphQuery__
 *
 * To run a query within a React component, call `useTestGetTagGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTagGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTagGraphQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestGetTagGraphQuery(baseOptions?: Apollo.QueryHookOptions<TestGetTagGraphQuery, TestGetTagGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetTagGraphQuery, TestGetTagGraphQueryVariables>(TestGetTagGraphGql, options);
      }
export function useTestGetTagGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetTagGraphQuery, TestGetTagGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetTagGraphQuery, TestGetTagGraphQueryVariables>(TestGetTagGraphGql, options);
        }
export type TestGetTagGraphQueryHookResult = ReturnType<typeof useTestGetTagGraphQuery>;
export type TestGetTagGraphLazyQueryHookResult = ReturnType<typeof useTestGetTagGraphLazyQuery>;
export type TestGetTagGraphQueryResult = Apollo.QueryResult<TestGetTagGraphQuery, TestGetTagGraphQueryVariables>;
export function refetchTestGetTagGraphQuery(variables?: TestGetTagGraphQueryVariables) {
      return { query: TestGetTagGraphGql, variables: variables }
    }