import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from '../../../graphql/PageBase.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { PageBaseFragmentDoc } from '../../../graphql/PageBase.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetPagesQueryVariables = Types.Exact<{
  input: Types.GetPagesInput;
}>;


export type GetPagesQuery = { pages: Array<PageBaseFragment> };


export const GetPagesGql = gql`
    query GetPages($input: GetPagesInput!) {
  pages: getPages(input: $input) {
    ...PageBase
  }
}
    ${PageBaseFragmentDoc}`;

/**
 * __useGetPagesQuery__
 *
 * To run a query within a React component, call `useGetPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPagesQuery(baseOptions: Apollo.QueryHookOptions<GetPagesQuery, GetPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPagesQuery, GetPagesQueryVariables>(GetPagesGql, options);
      }
export function useGetPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPagesQuery, GetPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPagesQuery, GetPagesQueryVariables>(GetPagesGql, options);
        }
export type GetPagesQueryHookResult = ReturnType<typeof useGetPagesQuery>;
export type GetPagesLazyQueryHookResult = ReturnType<typeof useGetPagesLazyQuery>;
export type GetPagesQueryResult = Apollo.QueryResult<GetPagesQuery, GetPagesQueryVariables>;
export function refetchGetPagesQuery(variables?: GetPagesQueryVariables) {
      return { query: GetPagesGql, variables: variables }
    }