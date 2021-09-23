import * as Types from '@codelab/shared/codegen/graphql';

import { PageFullFragment } from '../../../graphql/PageFull.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { PageFullFragmentDoc } from '../../../graphql/PageFull.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetPageQueryVariables = Types.Exact<{
  input: Types.GetPageInput;
}>;


export type GetPageQuery = { page?: Types.Maybe<PageFullFragment> };


export const GetPageGql = gql`
    query GetPage($input: GetPageInput!) {
  page: getPage(input: $input) {
    ...PageFull
  }
}
    ${PageFullFragmentDoc}`;

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageQuery(baseOptions: Apollo.QueryHookOptions<GetPageQuery, GetPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPageQuery, GetPageQueryVariables>(GetPageGql, options);
      }
export function useGetPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPageQuery, GetPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPageQuery, GetPageQueryVariables>(GetPageGql, options);
        }
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>;
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>;
export type GetPageQueryResult = Apollo.QueryResult<GetPageQuery, GetPageQueryVariables>;
export function refetchGetPageQuery(variables?: GetPageQueryVariables) {
      return { query: GetPageGql, variables: variables }
    }