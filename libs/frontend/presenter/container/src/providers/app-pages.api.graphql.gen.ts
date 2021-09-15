import * as Types from '@codelab/shared/codegen/graphql';

import { AppFragment } from '../../../../modules/app/src/App.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { AppFragmentDoc } from '../../../../modules/app/src/App.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AppPagesQueryVariables = Types.Exact<{
  input: Types.GetAppInput;
}>;


export type AppPagesQuery = { app?: Types.Maybe<AppFragment> };


export const AppPagesGql = gql`
    query AppPages($input: GetAppInput!) {
  app: getApp(input: $input) {
    ...App
  }
}
    ${AppFragmentDoc}`;

/**
 * __useAppPagesQuery__
 *
 * To run a query within a React component, call `useAppPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppPagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppPagesQuery(baseOptions: Apollo.QueryHookOptions<AppPagesQuery, AppPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppPagesQuery, AppPagesQueryVariables>(AppPagesGql, options);
      }
export function useAppPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppPagesQuery, AppPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppPagesQuery, AppPagesQueryVariables>(AppPagesGql, options);
        }
export type AppPagesQueryHookResult = ReturnType<typeof useAppPagesQuery>;
export type AppPagesLazyQueryHookResult = ReturnType<typeof useAppPagesLazyQuery>;
export type AppPagesQueryResult = Apollo.QueryResult<AppPagesQuery, AppPagesQueryVariables>;
export function refetchAppPagesQuery(variables?: AppPagesQueryVariables) {
      return { query: AppPagesGql, variables: variables }
    }