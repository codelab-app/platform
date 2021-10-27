import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetPageQueryVariables = Types.Exact<{
  input: Types.GetPageInput;
}>;


export type TestGetPageQuery = { page?: { id: string, name: string } | null | undefined };


export const TestGetPageGql = gql`
    query TestGetPage($input: GetPageInput!) {
  page: getPage(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useTestGetPageQuery__
 *
 * To run a query within a React component, call `useTestGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetPageQuery(baseOptions: Apollo.QueryHookOptions<TestGetPageQuery, TestGetPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetPageQuery, TestGetPageQueryVariables>(TestGetPageGql, options);
      }
export function useTestGetPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetPageQuery, TestGetPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetPageQuery, TestGetPageQueryVariables>(TestGetPageGql, options);
        }
export type TestGetPageQueryHookResult = ReturnType<typeof useTestGetPageQuery>;
export type TestGetPageLazyQueryHookResult = ReturnType<typeof useTestGetPageLazyQuery>;
export type TestGetPageQueryResult = Apollo.QueryResult<TestGetPageQuery, TestGetPageQueryVariables>;
export function refetchTestGetPageQuery(variables?: TestGetPageQueryVariables) {
      return { query: TestGetPageGql, variables: variables }
    }