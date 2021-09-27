import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagGraphFragment } from '../../domain/tag-graph.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TestTagGraphFragmentDoc } from '../../domain/tag-graph.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestExportTagsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestExportTagsQuery = { getTagGraphs: Array<TestTagGraphFragment> };


export const TestExportTagsGql = gql`
    query TestExportTags {
  getTagGraphs {
    ...TestTagGraph
  }
}
    ${TestTagGraphFragmentDoc}`;

/**
 * __useTestExportTagsQuery__
 *
 * To run a query within a React component, call `useTestExportTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestExportTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestExportTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestExportTagsQuery(baseOptions?: Apollo.QueryHookOptions<TestExportTagsQuery, TestExportTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestExportTagsQuery, TestExportTagsQueryVariables>(TestExportTagsGql, options);
      }
export function useTestExportTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestExportTagsQuery, TestExportTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestExportTagsQuery, TestExportTagsQueryVariables>(TestExportTagsGql, options);
        }
export type TestExportTagsQueryHookResult = ReturnType<typeof useTestExportTagsQuery>;
export type TestExportTagsLazyQueryHookResult = ReturnType<typeof useTestExportTagsLazyQuery>;
export type TestExportTagsQueryResult = Apollo.QueryResult<TestExportTagsQuery, TestExportTagsQueryVariables>;
export function refetchTestExportTagsQuery(variables?: TestExportTagsQueryVariables) {
      return { query: TestExportTagsGql, variables: variables }
    }