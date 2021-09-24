import * as Types from '@codelab/shared/codegen/graphql';

import { TagGraphFragment } from '../Tag.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TagGraphFragmentDoc } from '../Tag.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTagGraphQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTagGraphQuery = { getTagGraph?: Types.Maybe<TagGraphFragment> };


export const GetTagGraphGql = gql`
    query GetTagGraph {
  getTagGraph {
    ...TagGraph
  }
}
    ${TagGraphFragmentDoc}`;

/**
 * __useGetTagGraphQuery__
 *
 * To run a query within a React component, call `useGetTagGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagGraphQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagGraphQuery(baseOptions?: Apollo.QueryHookOptions<GetTagGraphQuery, GetTagGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagGraphQuery, GetTagGraphQueryVariables>(GetTagGraphGql, options);
      }
export function useGetTagGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagGraphQuery, GetTagGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagGraphQuery, GetTagGraphQueryVariables>(GetTagGraphGql, options);
        }
export type GetTagGraphQueryHookResult = ReturnType<typeof useGetTagGraphQuery>;
export type GetTagGraphLazyQueryHookResult = ReturnType<typeof useGetTagGraphLazyQuery>;
export type GetTagGraphQueryResult = Apollo.QueryResult<GetTagGraphQuery, GetTagGraphQueryVariables>;
export function refetchGetTagGraphQuery(variables?: GetTagGraphQueryVariables) {
      return { query: GetTagGraphGql, variables: variables }
    }