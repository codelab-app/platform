import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagFragment } from '../../../domain/tag.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TestTagFragmentDoc } from '../../../domain/tag.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetTagsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetTagsQuery = { getTags: Array<TestTagFragment> };


export const TestGetTagsGql = gql`
    query TestGetTags {
  getTags {
    ...TestTag
  }
}
    ${TestTagFragmentDoc}`;

/**
 * __useTestGetTagsQuery__
 *
 * To run a query within a React component, call `useTestGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<TestGetTagsQuery, TestGetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetTagsQuery, TestGetTagsQueryVariables>(TestGetTagsGql, options);
      }
export function useTestGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetTagsQuery, TestGetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetTagsQuery, TestGetTagsQueryVariables>(TestGetTagsGql, options);
        }
export type TestGetTagsQueryHookResult = ReturnType<typeof useTestGetTagsQuery>;
export type TestGetTagsLazyQueryHookResult = ReturnType<typeof useTestGetTagsLazyQuery>;
export type TestGetTagsQueryResult = Apollo.QueryResult<TestGetTagsQuery, TestGetTagsQueryVariables>;
export function refetchTestGetTagsQuery(variables?: TestGetTagsQueryVariables) {
      return { query: TestGetTagsGql, variables: variables }
    }