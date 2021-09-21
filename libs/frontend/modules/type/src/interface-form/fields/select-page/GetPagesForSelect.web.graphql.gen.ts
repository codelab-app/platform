import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetPagesForSelectQueryVariables = Types.Exact<{
  input: Types.GetPagesInput;
}>;


export type GetPagesForSelectQuery = { pages: Array<{ id: string, name: string }> };


export const GetPagesForSelectGql = gql`
    query GetPagesForSelect($input: GetPagesInput!) {
  pages: getPages(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useGetPagesForSelectQuery__
 *
 * To run a query within a React component, call `useGetPagesForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesForSelectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPagesForSelectQuery(baseOptions: Apollo.QueryHookOptions<GetPagesForSelectQuery, GetPagesForSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPagesForSelectQuery, GetPagesForSelectQueryVariables>(GetPagesForSelectGql, options);
      }
export function useGetPagesForSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPagesForSelectQuery, GetPagesForSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPagesForSelectQuery, GetPagesForSelectQueryVariables>(GetPagesForSelectGql, options);
        }
export type GetPagesForSelectQueryHookResult = ReturnType<typeof useGetPagesForSelectQuery>;
export type GetPagesForSelectLazyQueryHookResult = ReturnType<typeof useGetPagesForSelectLazyQuery>;
export type GetPagesForSelectQueryResult = Apollo.QueryResult<GetPagesForSelectQuery, GetPagesForSelectQueryVariables>;
export function refetchGetPagesForSelectQuery(variables?: GetPagesForSelectQueryVariables) {
      return { query: GetPagesForSelectGql, variables: variables }
    }