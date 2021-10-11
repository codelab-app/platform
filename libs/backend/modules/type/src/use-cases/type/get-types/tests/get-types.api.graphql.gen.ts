import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetTypesQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTypesInput>;
}>;


export type TestGetTypesQuery = { getTypes: Array<{ __typename: 'ArrayType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ComponentType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ElementType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'EnumType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'InterfaceType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'LambdaType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'PrimitiveType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'ReactNodeType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'RenderPropsType', id: string, name: string, typeKind: Types.TypeKind } | { __typename: 'UnionType', id: string, name: string, typeKind: Types.TypeKind }> };


export const TestGetTypesGql = gql`
    query TestGetTypes($input: GetTypesInput) {
  getTypes(input: $input) {
    __typename
    id
    name
    typeKind
  }
}
    `;

/**
 * __useTestGetTypesQuery__
 *
 * To run a query within a React component, call `useTestGetTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetTypesQuery(baseOptions?: Apollo.QueryHookOptions<TestGetTypesQuery, TestGetTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetTypesQuery, TestGetTypesQueryVariables>(TestGetTypesGql, options);
      }
export function useTestGetTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetTypesQuery, TestGetTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetTypesQuery, TestGetTypesQueryVariables>(TestGetTypesGql, options);
        }
export type TestGetTypesQueryHookResult = ReturnType<typeof useTestGetTypesQuery>;
export type TestGetTypesLazyQueryHookResult = ReturnType<typeof useTestGetTypesLazyQuery>;
export type TestGetTypesQueryResult = Apollo.QueryResult<TestGetTypesQuery, TestGetTypesQueryVariables>;
export function refetchTestGetTypesQuery(variables?: TestGetTypesQueryVariables) {
      return { query: TestGetTypesGql, variables: variables }
    }