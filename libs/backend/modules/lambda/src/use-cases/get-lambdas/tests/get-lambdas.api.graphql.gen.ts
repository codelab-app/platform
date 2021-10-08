import * as Types from '@codelab/frontend/abstract/codegen'

import { TestLambdaFragment } from '../../../domain/lambda.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestLambdaFragmentDoc } from '../../../domain/lambda.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetLambdasQueryVariables = Types.Exact<{ [key: string]: never }>

export type TestGetLambdasQuery = { getLambdas: Array<TestLambdaFragment> }

export const TestGetLambdasGql = gql`
  query TestGetLambdas {
    getLambdas {
      ...TestLambda
    }
  }
  ${TestLambdaFragmentDoc}
`

/**
 * __useTestGetLambdasQuery__
 *
 * To run a query within a React component, call `useTestGetLambdasQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetLambdasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetLambdasQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestGetLambdasQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TestGetLambdasQuery,
    TestGetLambdasQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetLambdasQuery, TestGetLambdasQueryVariables>(
    TestGetLambdasGql,
    options,
  )
}
export function useTestGetLambdasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetLambdasQuery,
    TestGetLambdasQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetLambdasQuery, TestGetLambdasQueryVariables>(
    TestGetLambdasGql,
    options,
  )
}
export type TestGetLambdasQueryHookResult = ReturnType<
  typeof useTestGetLambdasQuery
>
export type TestGetLambdasLazyQueryHookResult = ReturnType<
  typeof useTestGetLambdasLazyQuery
>
export type TestGetLambdasQueryResult = Apollo.QueryResult<
  TestGetLambdasQuery,
  TestGetLambdasQueryVariables
>
export function refetchTestGetLambdasQuery(
  variables?: TestGetLambdasQueryVariables,
) {
  return { query: TestGetLambdasGql, variables: variables }
}
