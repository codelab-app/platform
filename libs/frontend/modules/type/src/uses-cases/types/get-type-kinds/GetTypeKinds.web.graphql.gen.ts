import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetTypeKindsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTypesInput>
}>

export type GetTypeKindsQuery = {
  getTypes: Array<
    | { __typename: 'ArrayType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ComponentType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ElementType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'EnumType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'InterfaceType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'LambdaType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'PrimitiveType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ReactNodeType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'RenderPropsType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'UnionType'; id: string; typeKind: Types.TypeKind }
  >
}

export const GetTypeKindsGql = gql`
  query GetTypeKinds($input: GetTypesInput) {
    getTypes(input: $input) {
      id
      typeKind
      __typename
    }
  }
`

/**
 * __useGetTypeKindsQuery__
 *
 * To run a query within a React component, call `useGetTypeKindsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypeKindsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypeKindsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTypeKindsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTypeKindsQuery,
    GetTypeKindsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTypeKindsQuery, GetTypeKindsQueryVariables>(
    GetTypeKindsGql,
    options,
  )
}
export function useGetTypeKindsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTypeKindsQuery,
    GetTypeKindsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTypeKindsQuery, GetTypeKindsQueryVariables>(
    GetTypeKindsGql,
    options,
  )
}
export type GetTypeKindsQueryHookResult = ReturnType<
  typeof useGetTypeKindsQuery
>
export type GetTypeKindsLazyQueryHookResult = ReturnType<
  typeof useGetTypeKindsLazyQuery
>
export type GetTypeKindsQueryResult = Apollo.QueryResult<
  GetTypeKindsQuery,
  GetTypeKindsQueryVariables
>
export function refetchGetTypeKindsQuery(
  variables?: GetTypeKindsQueryVariables,
) {
  return { query: GetTypeKindsGql, variables: variables }
}
