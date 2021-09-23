import * as Types from '@codelab/shared/codegen/graphql';

import { Type_ArrayType_Fragment, Type_ComponentType_Fragment, Type_ElementType_Fragment, Type_EnumType_Fragment, Type_InterfaceType_Fragment, Type_LambdaType_Fragment, Type_PrimitiveType_Fragment } from '../../../graphql/Type.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TypeFragmentDoc } from '../../../graphql/Type.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTypesQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTypesInput>;
}>;


export type GetTypesQuery = { getTypes: Array<(
    { __typename: 'ArrayType' }
    & Type_ArrayType_Fragment
  ) | (
    { __typename: 'ComponentType' }
    & Type_ComponentType_Fragment
  ) | (
    { __typename: 'ElementType' }
    & Type_ElementType_Fragment
  ) | (
    { __typename: 'EnumType' }
    & Type_EnumType_Fragment
  ) | (
    { __typename: 'InterfaceType' }
    & Type_InterfaceType_Fragment
  ) | (
    { __typename: 'LambdaType' }
    & Type_LambdaType_Fragment
  ) | (
    { __typename: 'PrimitiveType' }
    & Type_PrimitiveType_Fragment
  )> };


export const GetTypesGql = gql`
    query GetTypes($input: GetTypesInput) {
  getTypes(input: $input) {
    __typename
    ...Type
  }
}
    ${TypeFragmentDoc}`;

/**
 * __useGetTypesQuery__
 *
 * To run a query within a React component, call `useGetTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetTypesQuery, GetTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTypesQuery, GetTypesQueryVariables>(GetTypesGql, options);
      }
export function useGetTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTypesQuery, GetTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTypesQuery, GetTypesQueryVariables>(GetTypesGql, options);
        }
export type GetTypesQueryHookResult = ReturnType<typeof useGetTypesQuery>;
export type GetTypesLazyQueryHookResult = ReturnType<typeof useGetTypesLazyQuery>;
export type GetTypesQueryResult = Apollo.QueryResult<GetTypesQuery, GetTypesQueryVariables>;
export function refetchGetTypesQuery(variables?: GetTypesQueryVariables) {
      return { query: GetTypesGql, variables: variables }
    }