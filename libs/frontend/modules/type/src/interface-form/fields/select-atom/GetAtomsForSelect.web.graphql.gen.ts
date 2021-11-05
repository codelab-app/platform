import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type AtomForSelectFragment = { id: string; name: string }

export type GetAtomsForSelectQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetAtomsForSelectQuery = {
  getAtoms?: Array<AtomForSelectFragment> | null | undefined
}

export const AtomForSelectFragmentDoc = gql`
  fragment AtomForSelect on Atom {
    id
    name
  }
`
export const GetAtomsForSelectGql = gql`
  query GetAtomsForSelect {
    getAtoms {
      ...AtomForSelect
    }
  }
  ${AtomForSelectFragmentDoc}
`

/**
 * __useGetAtomsForSelectQuery__
 *
 * To run a query within a React component, call `useGetAtomsForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomsForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomsForSelectQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAtomsForSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAtomsForSelectQuery,
    GetAtomsForSelectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetAtomsForSelectQuery,
    GetAtomsForSelectQueryVariables
  >(GetAtomsForSelectGql, options)
}
export function useGetAtomsForSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomsForSelectQuery,
    GetAtomsForSelectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetAtomsForSelectQuery,
    GetAtomsForSelectQueryVariables
  >(GetAtomsForSelectGql, options)
}
export type GetAtomsForSelectQueryHookResult = ReturnType<
  typeof useGetAtomsForSelectQuery
>
export type GetAtomsForSelectLazyQueryHookResult = ReturnType<
  typeof useGetAtomsForSelectLazyQuery
>
export type GetAtomsForSelectQueryResult = Apollo.QueryResult<
  GetAtomsForSelectQuery,
  GetAtomsForSelectQueryVariables
>
export function refetchGetAtomsForSelectQuery(
  variables?: GetAtomsForSelectQueryVariables,
) {
  return { query: GetAtomsForSelectGql, variables: variables }
}
