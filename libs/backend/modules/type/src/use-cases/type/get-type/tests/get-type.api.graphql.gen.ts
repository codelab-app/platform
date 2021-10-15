import * as Types from '@codelab/shared/codegen/graphql';

import { TagFragment, TagEdgeFragment } from '../../../../../../../../frontend/modules/tag/src/use-cases/Tag.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { TagFragmentDoc, TagEdgeFragmentDoc } from '../../../../../../../../frontend/modules/tag/src/use-cases/Tag.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetTypeQueryVariables = Types.Exact<{
  input: Types.GetTypeInput;
}>;


export type TestGetTypeQuery = { getType?: Types.Maybe<{ __typename: 'ArrayType', id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'ComponentType', id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'ElementType', kind: Types.ElementTypeKind, id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'EnumType', id: string, name: string, typeKind: Types.TypeKind, allowedValues: Array<{ id: string, name?: Types.Maybe<string>, value: string }>, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'InterfaceType', id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'LambdaType', id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'PrimitiveType', primitiveKind: Types.PrimitiveKind, id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'ReactNodeType', id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'RenderPropsType', id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> } | { __typename: 'UnionType', id: string, name: string, typeKind: Types.TypeKind, tags?: Types.Maybe<Array<TagFragment>> }> };


export const TestGetTypeGql = gql`
    query TestGetType($input: GetTypeInput!) {
  getType(input: $input) {
    __typename
    id
    name
    typeKind
    tags {
      ...Tag
    }
    ... on EnumType {
      allowedValues {
        id
        name
        value
      }
    }
    ... on ElementType {
      kind
    }
    ... on PrimitiveType {
      primitiveKind
    }
  }
}
    ${TagFragmentDoc}`;

/**
 * __useTestGetTypeQuery__
 *
 * To run a query within a React component, call `useTestGetTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetTypeQuery(baseOptions: Apollo.QueryHookOptions<TestGetTypeQuery, TestGetTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetTypeQuery, TestGetTypeQueryVariables>(TestGetTypeGql, options);
      }
export function useTestGetTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetTypeQuery, TestGetTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetTypeQuery, TestGetTypeQueryVariables>(TestGetTypeGql, options);
        }
export type TestGetTypeQueryHookResult = ReturnType<typeof useTestGetTypeQuery>;
export type TestGetTypeLazyQueryHookResult = ReturnType<typeof useTestGetTypeLazyQuery>;
export type TestGetTypeQueryResult = Apollo.QueryResult<TestGetTypeQuery, TestGetTypeQueryVariables>;
export function refetchTestGetTypeQuery(variables?: TestGetTypeQueryVariables) {
      return { query: TestGetTypeGql, variables: variables }
    }