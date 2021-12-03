import * as Types from '@codelab/frontend/abstract/codegen'

import { PropFragment } from '../../../../../../prop/src/graphql/Prop.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { PropFragmentDoc } from '../../../../../../prop/src/graphql/Prop.fragment.graphql.gen'
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
        renderForEachPropKey?: string | null | undefined
        renderIfPropKey?: string | null | undefined
        props: PropFragment
        atom?:
          | { id: string; name: string; type: Types.AtomType }
          | null
          | undefined
        hooks: Array<{
          id: string
          type: Types.AtomType
          config: { data: string }
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
      props {
        ...Prop
      }
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
          data
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
  ${PropFragmentDoc}
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
  variables: TestGetElementQueryVariables,
) {
  return { query: TestGetElementGql, variables: variables }
}
