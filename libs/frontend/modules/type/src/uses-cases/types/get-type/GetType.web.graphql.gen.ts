import * as Types from '@codelab/shared/codegen/graphql';

import { Type_ArrayType_Fragment, Type_ComponentType_Fragment, Type_ElementType_Fragment, Type_EnumType_Fragment, Type_InterfaceType_Fragment, Type_LambdaType_Fragment, Type_PrimitiveType_Fragment, Type_ReactNodeType_Fragment, Type_RenderPropsType_Fragment, Type_UnionType_Fragment } from '../../../graphql/Type.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TypeFragmentDoc } from '../../../graphql/Type.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTypeQueryVariables = Types.Exact<{
  input: Types.GetTypeInput;
}>;


export type GetTypeQuery = { getType?: Types.Maybe<Type_ArrayType_Fragment | Type_ComponentType_Fragment | Type_ElementType_Fragment | Type_EnumType_Fragment | Type_InterfaceType_Fragment | Type_LambdaType_Fragment | Type_PrimitiveType_Fragment | Type_ReactNodeType_Fragment | Type_RenderPropsType_Fragment | Type_UnionType_Fragment> };


export const GetTypeGql = gql`
    query GetType($input: GetTypeInput!) {
  getType(input: $input) {
    ...Type
  }
}
    ${TypeFragmentDoc}`;

/**
 * __useGetTypeQuery__
 *
 * To run a query within a React component, call `useGetTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTypeQuery(baseOptions: Apollo.QueryHookOptions<GetTypeQuery, GetTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTypeQuery, GetTypeQueryVariables>(GetTypeGql, options);
      }
export function useGetTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTypeQuery, GetTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTypeQuery, GetTypeQueryVariables>(GetTypeGql, options);
        }
export type GetTypeQueryHookResult = ReturnType<typeof useGetTypeQuery>;
export type GetTypeLazyQueryHookResult = ReturnType<typeof useGetTypeLazyQuery>;
export type GetTypeQueryResult = Apollo.QueryResult<GetTypeQuery, GetTypeQueryVariables>;
export function refetchGetTypeQuery(variables?: GetTypeQueryVariables) {
      return { query: GetTypeGql, variables: variables }
    }