import * as Types from '@codelab/shared/codegen/graphql';

import { TestAppFragment } from '../../../application/app.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TestAppFragmentDoc } from '../../../application/app.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetAppQueryVariables = Types.Exact<{
  input: Types.GetAppInput;
}>;


export type TestGetAppQuery = { getApp?: Types.Maybe<TestAppFragment> };


export const TestGetAppGql = gql`
    query TestGetApp($input: GetAppInput!) {
  getApp(input: $input) {
    ...TestApp
  }
}
    ${TestAppFragmentDoc}`;

/**
 * __useTestGetAppQuery__
 *
 * To run a query within a React component, call `useTestGetAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetAppQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetAppQuery(baseOptions: Apollo.QueryHookOptions<TestGetAppQuery, TestGetAppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetAppQuery, TestGetAppQueryVariables>(TestGetAppGql, options);
      }
export function useTestGetAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetAppQuery, TestGetAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetAppQuery, TestGetAppQueryVariables>(TestGetAppGql, options);
        }
export type TestGetAppQueryHookResult = ReturnType<typeof useTestGetAppQuery>;
export type TestGetAppLazyQueryHookResult = ReturnType<typeof useTestGetAppLazyQuery>;
export type TestGetAppQueryResult = Apollo.QueryResult<TestGetAppQuery, TestGetAppQueryVariables>;
export function refetchTestGetAppQuery(variables?: TestGetAppQueryVariables) {
      return { query: TestGetAppGql, variables: variables }
    }