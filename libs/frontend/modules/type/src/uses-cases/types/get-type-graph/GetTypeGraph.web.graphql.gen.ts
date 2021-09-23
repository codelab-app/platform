import * as Types from '@codelab/shared/codegen/graphql';

import { TypeGraphFragment } from '../../../graphql/TypeGraph.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TypeGraphFragmentDoc } from '../../../graphql/TypeGraph.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTypeGraphQueryVariables = Types.Exact<{
  input: Types.GetTypeInput;
}>;


export type GetTypeGraphQuery = { getTypeGraph?: Types.Maybe<TypeGraphFragment> };


export const GetTypeGraphGql = gql`
    query GetTypeGraph($input: GetTypeInput!) {
  getTypeGraph(input: $input) {
    ...TypeGraph
  }
}
    ${TypeGraphFragmentDoc}`;

/**
 * __useGetTypeGraphQuery__
 *
 * To run a query within a React component, call `useGetTypeGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypeGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypeGraphQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTypeGraphQuery(baseOptions: Apollo.QueryHookOptions<GetTypeGraphQuery, GetTypeGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTypeGraphQuery, GetTypeGraphQueryVariables>(GetTypeGraphGql, options);
      }
export function useGetTypeGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTypeGraphQuery, GetTypeGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTypeGraphQuery, GetTypeGraphQueryVariables>(GetTypeGraphGql, options);
        }
export type GetTypeGraphQueryHookResult = ReturnType<typeof useGetTypeGraphQuery>;
export type GetTypeGraphLazyQueryHookResult = ReturnType<typeof useGetTypeGraphLazyQuery>;
export type GetTypeGraphQueryResult = Apollo.QueryResult<GetTypeGraphQuery, GetTypeGraphQueryVariables>;
export function refetchGetTypeGraphQuery(variables?: GetTypeGraphQueryVariables) {
      return { query: GetTypeGraphGql, variables: variables }
    }