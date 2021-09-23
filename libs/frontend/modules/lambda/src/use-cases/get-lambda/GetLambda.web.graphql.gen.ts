import * as Types from '@codelab/shared/codegen/graphql';

import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { LambdaFragmentDoc } from '../../graphql/Lambda.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetLambdaQueryVariables = Types.Exact<{
  input: Types.GetLambdaInput;
}>;


export type GetLambdaQuery = { getLambda?: Types.Maybe<LambdaFragment> };


export const GetLambdaGql = gql`
    query GetLambda($input: GetLambdaInput!) {
  getLambda(input: $input) {
    ...Lambda
  }
}
    ${LambdaFragmentDoc}`;

/**
 * __useGetLambdaQuery__
 *
 * To run a query within a React component, call `useGetLambdaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLambdaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLambdaQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLambdaQuery(baseOptions: Apollo.QueryHookOptions<GetLambdaQuery, GetLambdaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLambdaQuery, GetLambdaQueryVariables>(GetLambdaGql, options);
      }
export function useGetLambdaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLambdaQuery, GetLambdaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLambdaQuery, GetLambdaQueryVariables>(GetLambdaGql, options);
        }
export type GetLambdaQueryHookResult = ReturnType<typeof useGetLambdaQuery>;
export type GetLambdaLazyQueryHookResult = ReturnType<typeof useGetLambdaLazyQuery>;
export type GetLambdaQueryResult = Apollo.QueryResult<GetLambdaQuery, GetLambdaQueryVariables>;
export function refetchGetLambdaQuery(variables?: GetLambdaQueryVariables) {
      return { query: GetLambdaGql, variables: variables }
    }