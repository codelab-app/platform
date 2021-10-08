import * as Types from '@codelab/frontend/abstract/codegen'

import { FieldFragment } from '../../../graphql/Field.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { FieldFragmentDoc } from '../../../graphql/Field.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetFieldQueryVariables = Types.Exact<{
  input: Types.GetFieldInput
}>

export type GetFieldQuery = { getField?: FieldFragment | null | undefined }

export const GetFieldGql = gql`
  query GetField($input: GetFieldInput!) {
    getField(input: $input) {
      ...Field
    }
  }
  ${FieldFragmentDoc}
`

/**
 * __useGetFieldQuery__
 *
 * To run a query within a React component, call `useGetFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFieldQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFieldQuery(
  baseOptions: Apollo.QueryHookOptions<GetFieldQuery, GetFieldQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFieldQuery, GetFieldQueryVariables>(
    GetFieldGql,
    options,
  )
}
export function useGetFieldLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFieldQuery,
    GetFieldQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFieldQuery, GetFieldQueryVariables>(
    GetFieldGql,
    options,
  )
}
export type GetFieldQueryHookResult = ReturnType<typeof useGetFieldQuery>
export type GetFieldLazyQueryHookResult = ReturnType<
  typeof useGetFieldLazyQuery
>
export type GetFieldQueryResult = Apollo.QueryResult<
  GetFieldQuery,
  GetFieldQueryVariables
>
export function refetchGetFieldQuery(variables?: GetFieldQueryVariables) {
  return { query: GetFieldGql, variables: variables }
}
