import * as Types from '@codelab/shared/codegen/graphql';

import { LambdaFragment } from '../../graphql/Lambda.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { LambdaFragmentDoc } from '../../graphql/Lambda.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetLambdasQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLambdasQuery = { getLambdas: Array<LambdaFragment> };


export const GetLambdasGql = gql`
    query GetLambdas {
  getLambdas {
    ...Lambda
  }
}
    ${LambdaFragmentDoc}`;

/**
 * __useGetLambdasQuery__
 *
 * To run a query within a React component, call `useGetLambdasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLambdasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLambdasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLambdasQuery(baseOptions?: Apollo.QueryHookOptions<GetLambdasQuery, GetLambdasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLambdasQuery, GetLambdasQueryVariables>(GetLambdasGql, options);
      }
export function useGetLambdasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLambdasQuery, GetLambdasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLambdasQuery, GetLambdasQueryVariables>(GetLambdasGql, options);
        }
export type GetLambdasQueryHookResult = ReturnType<typeof useGetLambdasQuery>;
export type GetLambdasLazyQueryHookResult = ReturnType<typeof useGetLambdasLazyQuery>;
export type GetLambdasQueryResult = Apollo.QueryResult<GetLambdasQuery, GetLambdasQueryVariables>;
export function refetchGetLambdasQuery(variables?: GetLambdasQueryVariables) {
      return { query: GetLambdasGql, variables: variables }
    }