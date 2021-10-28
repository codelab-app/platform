import * as Types from '@codelab/shared/codegen/graphql';

import { TestAppFragment } from '../../../application/app.fragment.graphql.gen';
import { TestAppFragmentDoc } from '../../../application/app.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetAppsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetAppsQuery = { apps: Array<TestAppFragment> };


export const TestGetAppsGql = `
    query TestGetApps {
  apps: getApps {
    ...TestApp
  }
}
    ${TestAppFragmentDoc}`;

/**
 * __useTestGetAppsQuery__
 *
 * To run a query within a React component, call `useTestGetAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetAppsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestGetAppsQuery(baseOptions?: Apollo.QueryHookOptions<TestGetAppsQuery, TestGetAppsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetAppsQuery, TestGetAppsQueryVariables>(TestGetAppsGql, options);
      }
export function useTestGetAppsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetAppsQuery, TestGetAppsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetAppsQuery, TestGetAppsQueryVariables>(TestGetAppsGql, options);
        }
export type TestGetAppsQueryHookResult = ReturnType<typeof useTestGetAppsQuery>;
export type TestGetAppsLazyQueryHookResult = ReturnType<typeof useTestGetAppsLazyQuery>;
export type TestGetAppsQueryResult = Apollo.QueryResult<TestGetAppsQuery, TestGetAppsQueryVariables>;
export function refetchTestGetAppsQuery(variables?: TestGetAppsQueryVariables) {
      return { query: TestGetAppsGql, variables: variables }
    }