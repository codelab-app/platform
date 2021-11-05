import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetElementQueryVariables = Types.Exact<{
  input: Types.GetElementInput
}>

export type TestGetElementQuery = {
  getElement?:
    | {
        id: string
        name?: string | null | undefined
        css?: string | null | undefined
        props: string
        renderForEachPropKey?: string | null | undefined
        renderIfPropKey?: string | null | undefined
        atom?:
          | { id: string; name: string; type: Types.AtomType }
          | null
          | undefined
        hooks: Array<{
          id: string
          type: Types.HookType
          config:
            | {
                __typename: 'GraphqlHookConfig'
                graphqlBody: string
                dataKey?: string | null | undefined
                graphqlUrl: string
              }
            | {
                __typename: 'QueryHookConfig'
                body?: string | null | undefined
                lambdaId?: string | null | undefined
                method?: Types.QueryMethod | null | undefined
                queryKey: string
                url?: string | null | undefined
              }
            | {
                __typename: 'RecoilStateHookConfig'
                defaultValue?: string | null | undefined
                stateKey: string
                persisted: Types.PersistenceType
              }
            | {}
        }>
        propMapBindings: Array<{
          id: string
          sourceKey: string
          targetElementId?: string | null | undefined
          targetKey: string
        }>
      }
    | null
    | undefined
}

export const TestGetElementGql = gql`
  query TestGetElement($input: GetElementInput!) {
    getElement(input: $input) {
      id
      name
      css
      props
      atom {
        id
        name
        type
      }
      renderForEachPropKey
      renderIfPropKey
      hooks {
        id
        type
        config {
          ... on QueryHookConfig {
            __typename
            body
            lambdaId
            method
            queryKey
            url
          }
          ... on RecoilStateHookConfig {
            defaultValue
            stateKey
            persisted
            __typename
          }
          ... on GraphqlHookConfig {
            graphqlBody
            dataKey
            graphqlUrl
            __typename
          }
        }
      }
      propMapBindings {
        id
        sourceKey
        targetElementId
        targetKey
      }
    }
  }
`

/**
 * __useTestGetElementQuery__
 *
 * To run a query within a React component, call `useTestGetElementQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetElementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetElementQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetElementQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetElementQuery,
    TestGetElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetElementQuery, TestGetElementQueryVariables>(
    TestGetElementGql,
    options,
  )
}
export function useTestGetElementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetElementQuery,
    TestGetElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetElementQuery, TestGetElementQueryVariables>(
    TestGetElementGql,
    options,
  )
}
export type TestGetElementQueryHookResult = ReturnType<
  typeof useTestGetElementQuery
>
export type TestGetElementLazyQueryHookResult = ReturnType<
  typeof useTestGetElementLazyQuery
>
export type TestGetElementQueryResult = Apollo.QueryResult<
  TestGetElementQuery,
  TestGetElementQueryVariables
>
export function refetchTestGetElementQuery(
  variables?: TestGetElementQueryVariables,
) {
  return { query: TestGetElementGql, variables: variables }
}
