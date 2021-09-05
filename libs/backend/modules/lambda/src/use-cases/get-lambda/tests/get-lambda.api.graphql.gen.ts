import * as Types from '@codelab/shared/codegen/graphql';

import { TestLambdaFragment } from '../../../domain/lambda.fragments.api.graphql.gen';
import { gql } from '@apollo/client';
import { TestLambdaFragmentDoc } from '../../../domain/lambda.fragments.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetLambdaQueryVariables = Types.Exact<{
  input: Types.GetLambdaInput;
}>;


export type TestGetLambdaQuery = { getLambda?: Types.Maybe<TestLambdaFragment> };


export const TestGetLambdaGql = gql`
    query TestGetLambda($input: GetLambdaInput!) {
  getLambda(input: $input) {
    ...TestLambda
  }
}
    ${TestLambdaFragmentDoc}`;

/**
 * __useTestGetLambdaQuery__
 *
 * To run a query within a React component, call `useTestGetLambdaQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetLambdaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetLambdaQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetLambdaQuery(baseOptions: Apollo.QueryHookOptions<TestGetLambdaQuery, TestGetLambdaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetLambdaQuery, TestGetLambdaQueryVariables>(TestGetLambdaGql, options);
      }
export function useTestGetLambdaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetLambdaQuery, TestGetLambdaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetLambdaQuery, TestGetLambdaQueryVariables>(TestGetLambdaGql, options);
        }
export type TestGetLambdaQueryHookResult = ReturnType<typeof useTestGetLambdaQuery>;
export type TestGetLambdaLazyQueryHookResult = ReturnType<typeof useTestGetLambdaLazyQuery>;
export type TestGetLambdaQueryResult = Apollo.QueryResult<TestGetLambdaQuery, TestGetLambdaQueryVariables>;
export function refetchTestGetLambdaQuery(variables?: TestGetLambdaQueryVariables) {
      return { query: TestGetLambdaGql, variables: variables }
    }