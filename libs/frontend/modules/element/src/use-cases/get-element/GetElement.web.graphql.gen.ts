import * as Types from '@codelab/frontend/abstract/codegen'

import { ElementFragment } from '../../graphql/Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { ElementFragmentDoc } from '../../graphql/Element.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetElementQueryVariables = Types.Exact<{
  input: Types.GetElementInput
}>

export type GetElementQuery = {
  getElement?: ElementFragment | null | undefined
}

export const GetElementGql = gql`
  query GetElement($input: GetElementInput!) {
    getElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

/**
 * __useGetElementQuery__
 *
 * To run a query within a React component, call `useGetElementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElementQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetElementQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetElementQuery,
    GetElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElementQuery, GetElementQueryVariables>(
    GetElementGql,
    options,
  )
}
export function useGetElementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetElementQuery,
    GetElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElementQuery, GetElementQueryVariables>(
    GetElementGql,
    options,
  )
}
export type GetElementQueryHookResult = ReturnType<typeof useGetElementQuery>
export type GetElementLazyQueryHookResult = ReturnType<
  typeof useGetElementLazyQuery
>
export type GetElementQueryResult = Apollo.QueryResult<
  GetElementQuery,
  GetElementQueryVariables
>
export function refetchGetElementQuery(variables?: GetElementQueryVariables) {
  return { query: GetElementGql, variables: variables }
}
