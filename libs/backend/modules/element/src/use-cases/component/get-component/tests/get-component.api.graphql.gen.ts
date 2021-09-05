import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetComponentQueryVariables = Types.Exact<{
  input: Types.GetComponentInput;
}>;


export type TestGetComponentQuery = { getComponent?: Types.Maybe<{ id: string, name: string }> };


export const TestGetComponentGql = gql`
    query TestGetComponent($input: GetComponentInput!) {
  getComponent(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useTestGetComponentQuery__
 *
 * To run a query within a React component, call `useTestGetComponentQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetComponentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetComponentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetComponentQuery(baseOptions: Apollo.QueryHookOptions<TestGetComponentQuery, TestGetComponentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetComponentQuery, TestGetComponentQueryVariables>(TestGetComponentGql, options);
      }
export function useTestGetComponentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetComponentQuery, TestGetComponentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetComponentQuery, TestGetComponentQueryVariables>(TestGetComponentGql, options);
        }
export type TestGetComponentQueryHookResult = ReturnType<typeof useTestGetComponentQuery>;
export type TestGetComponentLazyQueryHookResult = ReturnType<typeof useTestGetComponentLazyQuery>;
export type TestGetComponentQueryResult = Apollo.QueryResult<TestGetComponentQuery, TestGetComponentQueryVariables>;
export function refetchTestGetComponentQuery(variables?: TestGetComponentQueryVariables) {
      return { query: TestGetComponentGql, variables: variables }
    }